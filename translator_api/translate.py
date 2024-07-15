from flask import Flask, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

@app.route("/hello")
def hello():
    # returning data and the response code 200
    return jsonify({'message': 'Hello world!'}), 200

@app.route("/translate/", methods=['POST'])
def translate():
    data = request.get_json()
    print(data)
    # from data we will need the capture_key and the location of the input files
    word = data['word']

    try:
        translated = GoogleTranslator(source='fr', target='en').translate(word)
        return jsonify({'english_word': translated})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# run the application
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080)
