### Installation guide for the backend
Install the dependencies

```sh
cd /frontend
npm install
```

Run the frontend

```sh
npm start
```

The frontend runs on port 3000

### What is in the frontend?
The frontend of the project is developed using React and Tailwind CSS for styling.

**./Router.tsx**

Contains all the routes of our app

**./components/Home.tsx or 'http://localhost:3000/'**'

Is the main page that quickly explains the rules of the game.
It has two buttons 1. to start the game, 2. to check the history of the player's winnings/losses.

**./components/Game.tsx or 'http://localhost:3000/history'**

Table that shows the history of the player's winnings/losses.

**./components/NotFound.tsx or 'http://localhost:3000/\*'**

Not found page.

**./components/Game/Game.tsx or 'http://localhost:3000/play'**

The core of our application is the game itself, designed to be minimal yet informative for the user. At the top, we provide a subtle gray reminder of the task: "What's the English translation of this word?" The French word to be translated is displayed prominently in bold, clear white text. Below, an interactive dashed input field indicates the word length and autofills the first letter. Players cannot submit an answer that is too short; a warning message, "Input too short!", will appear if they try.

When the user guesses correctly, a green "+1" floats on the screen, and the overall score in the top right corner increments by one. Conversely, an incorrect guess results in a red "-1" and a corresponding score decrement.

At the end of the game, if the player wins, confetti celebrates their victory with the message "You won!". If they lose, no confetti appears, and the message "You have lost :(" is displayed.


### Future Improvements
- **Timer for the Game**: Implement a countdown timer for each round, and record the time taken in the game history. This adds an element of urgency and allows for performance tracking.
- **Handle Multi-Word Translations**: Some translations contain spaces. It would be helpful to replace spaces actual spaces in the input field to indicate that the translated word comprises multiple words, providing better guidance to the user.
