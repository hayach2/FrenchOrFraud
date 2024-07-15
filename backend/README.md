### Installation guide for the backend
Install the dependencies

```sh
cd /backend
npm install
```

Migrate the database

```sh
npx sequelize-cli db:migrate
```

Run the seeder to populate the FrenchVerbs table; We only have one seeder script that is designed to populate the FrenchVerbs table with data from a text file (verbs.txt).

```sh
npx sequelize-cli db:seed:all
```

Finally, run the backend

```sh
npm start
```
The backend runs on port 8000

Make sure you create your own .env file. An example .env.example file is provided for you to complete. 
You need to create a database on your local mysql.

### What is in the backend?
#### Migrations:
- Create FrenchVerbs table
- Create History table

#### Models: 
- FrenchVerbs:
    - verb (a french verb)
    - attempts (how many times did the user attempt to guess this word in english?)
    - successes (how many times did the user succeed at guessing this word?)

This formula : (data["failure_rate"] = (data["attempts"] - data["successes"]) / data["attempts"]) is what I used to classify a word as Easy or Hard. If the word has (< 0.3) then it is classified as easy and otherwise it's hard.
Everytime a player encounters a word we check:
- If they guessed correctly, we increase attempt by 1 and successes by 1.
- If they missed it, we increase attempt by one but NOTHING is done for the successes.
This helps us keep track of how many players attempted at a word, if they attempted too many times and there was no success, then the word is indeed hard. On the other hand, if attempts == successes then the word is easy.

- History:
    - status (0 -> Lost, 1 -> Won)

#### Seeders:
- Populate French Verbs : Populate the FrenchVerbs table with data from a text file (verbs.txt).