from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
from models.ai_chat import AIChatModel
from models.parkinson_model import ParkinsonModel

app = Flask(__name__)
CORS(app)

# Paths
UPLOAD_FOLDER = 'data'
FFMPEG_PATH = r"C:\Users\prasa\OneDrive\Documents\ffmpeg-2025-03-31-git-35c091f4b7-essentials_build\ffmpeg-2025-03-31-git-35c091f4b7-essentials_build\bin\ffmpeg.exe"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Models
ai_chat = AIChatModel()
parkinson_model = ParkinsonModel()



@app.route("/ai", methods=["POST"])
def ai_chat_endpoint():
    try:
        data = request.get_json()
        user_query = data.get('message', '')
        response = ai_chat.get_response(
            user_query, text_input=" ", image_input=None, document_input=None, voice_input=None
        )
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/parkinson", methods=["POST"])
def parkinson_endpoint():
    try:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file provided"}), 400

        audio_file = request.files['audio']
        if not audio_file or not audio_file.filename:
            return jsonify({"error": "Invalid audio file"}), 400

        webm_path = os.path.join(UPLOAD_FOLDER, "input.webm")
        wav_path = os.path.join(UPLOAD_FOLDER, "converted.wav")

        audio_file.save(webm_path)

        if not os.path.exists(webm_path):
            return jsonify({"error": "Audio file not saved properly."}), 500

        command = f'"{FFMPEG_PATH}" -y -i "{webm_path}" -ar 16000 -ac 1 "{wav_path}"'
        result = subprocess.run(command, shell=True, capture_output=True, text=True)

        if result.returncode != 0:
            return jsonify({"error": f"FFmpeg conversion failed: {result.stderr.strip()}"}), 500

        features = parkinson_model.extract_features(wav_path)
        prediction, probability = parkinson_model.predict(features)

        os.remove(webm_path)
        os.remove(wav_path)

        return jsonify({
            "prediction": prediction,
            "probability": round(probability, 2)
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
