import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import FrenchVerbs from './models/frenchverbs';
import History from './models/history';


const { Sequelize, Op } = require('sequelize');

const app = express();
const port = 8000;
const request = require('request');
const env = process.env.NODE_ENV || 'development';
const dbConfig = require(__dirname + '/config/config.js')[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((error: any) => {
  console.error('Unable to connect to the database:', error);
});

app.use(bodyParser.json());

app.get('/french-verb', async (req, res) => {
  /* 
    GET /french-verb : req (difficult, idsToExclude) => res (frenchWord, englishTranslation)

    This API fetches a french word from the database based on the difficulty level we feed it.
    It also doesn't return the same verb that was given before.

    This is how we determine the difficulty of the word: (attempts - successes) / attempts > 0.3
    Anything more than 0.3 is considered hard and less than 0.3 is considered easy.
  */
  try {
    const { difficult, idsToExclude }: { difficult?: string, idsToExclude?: string } = req.query;

    let idsToExcludeArray: number[] = [];

    if (idsToExclude) {
      idsToExcludeArray = idsToExclude.split(',').map(id => parseInt(id, 10));
    }

    // Convert string 'true' or 'false' to boolean
    const isDifficult = difficult === 'true';

    // Define base condition based on difficult flag
    const baseCondition = isDifficult ? {
      attempts: {
        [Op.gt]: 0 // Ensure attempts is greater than 0 to avoid division by zero
      },
      [Op.and]: sequelize.literal('(attempts - successes) / attempts > 0.3')
    } : {
      [Op.or]: [
        { attempts: 0 },
        sequelize.where(sequelize.col('attempts'), '=', sequelize.col('successes'))
      ]
    };
    
    // Fetch verbs based on the condition
    let verbs = await FrenchVerbs.findAll({
      where: {
        [Sequelize.Op.and]: [
          baseCondition, // Your base condition
          {
            id: {
              [Sequelize.Op.notIn]: idsToExcludeArray
            }
          }
        ]
      }
    });

    // If no verbs match the condition, fetch all verbs
    if (verbs.length === 0) {
      verbs = await FrenchVerbs.findAll({
        where: {
          id: {
            [Sequelize.Op.notIn]: idsToExcludeArray
          }
        }
      });
    }

    const count = verbs.length;

    // Ensure verbs array is not empty
    if (count === 0) {
      return res.status(404).send('No French verbs found.');
    }

    // Generate a random index to fetch a random verb
    const randomIndex = Math.floor(Math.random() * count);

    // Fetch a random verb from the filtered array
    const randomVerb = verbs[randomIndex].get();

    var englishWord = null;

    if (!randomVerb) {
      return res.status(404).send('No French verbs found.');
    }

    // translating from french -> english
    await request.post(
        'http://127.0.0.1:8080/translate/',
        { json: { word: randomVerb.verb } },

        function (error : any, response : any, body : any) {
            if (!error && response.statusCode == 200) {
              englishWord = body.english_word;

              // if you feel like cheating ;)
              console.log({'id' : randomVerb.id, 'french' : randomVerb.verb, 'english' : englishWord});

              res.send({'id' : randomVerb.id, 'french' : randomVerb.verb, 'english' : englishWord});
            }
        }
    );
  } catch (error) {
    console.error('Error fetching and translating verb:', error);
    res.status(500).json({ error: 'Failed to fetch and translate verb.' });
  }
    
});

app.post('/french-verb', async (req: Request, res: Response) => {
  /*
    POST /french-verb : req (id, successes) => void

    This function updates the french verb's attempts and successes attributes.
  */
  try {
    const { id, successes } = req.body;
    // Find the FrenchVerbs entry by id
    const frenchVerb = await FrenchVerbs.findByPk(id);

    if (!frenchVerb) {
      return res.status(404).json({ message: 'FrenchVerbs entry not found' });
    }

    // Always increment attempts by 1
    await frenchVerb.increment('attempts');

    // Increment successes by 1 if successes is true
    if (successes === true) {
      await frenchVerb.increment('successes');
    }

    res.status(201).json({ message: 'FrenchVerbs updated successfully', entry: frenchVerb });

  } catch (error) {
    console.error('Error updating FrenchVerbs entry:', error);
    res.status(500).json({ message: 'Failed to update FrenchVerbs entry' });
  }
});


app.get('/history', async (req: Request, res: Response) => {
  /*
    GET /history : req () -> res (History objects array)
  */
  try {
    const historyEntries = await History.findAll({
      attributes: ['status', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(historyEntries);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

app.post('/history', async (req: Request, res: Response) => {
  /*
    POST /history : req ( status ) -> void

    Adds a new entry the the history table (if user won or lost).
  */
  try {
    const { status } = req.body;

    // Create a new record in the History table
    const newHistoryEntry = History.create({
      status, 
    });

    res.status(201).json({ message: 'History entry created successfully', entry: newHistoryEntry });
  } catch (error) {
    console.error('Error creating history entry:', error);
    res.status(500).json({ message: 'Failed to create history entry' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
