from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import io
import os

app = Flask(__name__)

# ✅ Correct Windows path using raw string
MODEL_PATH = r"C:\Users\Azfar\Downloads\Scanovafinal\Scanova3\flask-server\models\lung_cancer_model_best.h5"

# ✅ Load the trained model
model = load_model(MODEL_PATH)

# Class names and tips (unchanged)
class_names = ['BENIGN CASES', 'MALIGNANT CASES', 'NORMAL CASES']
calming_tips = {
    'BENIGN CASES': [
        "Maintain regular health check-ups.",
        "Engage in stress-reducing activities like meditation.",
        "Ensure a balanced diet and regular exercise."
    ],
    'MALIGNANT CASES': [
        "Consult with your healthcare provider promptly.",
        "Seek support from friends and family.",
        "Stay informed about treatment options."
    ],
    'NORMAL CASES': [
        "Continue with healthy lifestyle choices.",
        "Stay vigilant with regular screenings.",
        "Keep up with preventive measures."
    ]
}


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((224, 224))
        img_array = img_to_array(img)
        img_array = preprocess_input(img_array)
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions)]
        tips = calming_tips.get(predicted_class, [])

        return jsonify({
            'predicted_class': predicted_class,
            'calming_tips': tips
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)
