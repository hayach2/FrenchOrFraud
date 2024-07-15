### Installation guide for the translator API
Install the dependencies

```sh
pip install -r requirements.txt
python3 translate.py
```

The translator API runs on port 8080.

IF the steps above don't work for you, there are other ways you can run this environment. If it did, you can ignore the following step.
```sh
pipenv install
pipenv install flask
pipenv install deep-translator
pipenv shell
```
Now you're in a virtual environment where you can run:
```sh
python3 translate.py
```

### All done!
Now that you have your three terminals running (1. Backend, 2. Frontend, 3. Translator_API), you're all set. 
You can now start playing the game, goodluck!