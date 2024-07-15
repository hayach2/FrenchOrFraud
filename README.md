# French or Fraud?
This repository contains three main folders:
- frontend: Contains the frontend
- backend: Contains the backend
- translator_api: Contains the API to translate the words from French to English for free. Currenly, there's no free API that provides translations, so I had to create my own API from a python library that I found.
 
!! **Make sure to read the README.md files in each of the main folders of this repository**!!:
1. README.md (this one)
2. frontend/README.md
2. backend/README.md
3. translator_api/README.md

### Instructions to install & setup your project
In each main file (frontend, backend, translator_api) there's a README.md file that explains the steps of installing each environment.

You should have all three of your environemnts running at the same time in order for the app to function.

### Technology Stack
- Frontend: Built with React.js with Tailwind CSS.
- Backend: Built with Node.js and Express.js.
- Language: TypeScript for both frontend and backend.
- Database: mysql.

### Additional Challenge
To showcase additional skills and creativity, the project includes optional features:
- **Difficulty levels for words, adjusting the game's difficulty based on the player's performance** : This was done based on this formula (data["failure_rate"] = (data["attempts"] - data["successes"]) / data["attempts"]) if the word has (< 0.3) then it is classified as easy and otherwise it's hard.
- **Game history.**
- **Analytics to identify the most challenging words, enhancing the difficulty adjustment feature.**

### Future Improvements
I had so many ideas while building this application, that I would love to implement later on:
- **Timer for the Game**: Implement a countdown timer for each round, and record the time taken in the game history. This adds an element of urgency and allows for performance tracking.
- **Handle Multi-Word Translations**: Some translations contain spaces. It would be helpful to replace spaces actual spaces in the input field to indicate that the translated word comprises multiple words, providing better guidance to the user.
- **Support of many languages**: The translator API supports the translation from and to any language in the world! We can give the user the option to choose any language they want in the beginning, in case they're not familiar with English so they might want to translate from French to German (for example).
- **Race between 2 players and provide a leaderboard**: Unfortunately, I didn't have time for this.