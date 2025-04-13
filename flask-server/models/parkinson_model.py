import numpy as np
import joblib
import parselmouth
import librosa
from nolds import dfa
from pydub import AudioSegment
import os


class ParkinsonModel:
    def __init__(self, model_path='random_forest_model.pkl'):
        self.model_path = model_path

    def convert_to_wav(self, file_path: str) -> str:
        try:
            audio = AudioSegment.from_file(file_path)
            wav_path = os.path.splitext(file_path)[0] + "_converted.wav"
            audio = audio.set_channels(1).set_frame_rate(16000)
            audio.export(wav_path, format="wav")
            return wav_path
        except Exception as e:
            print(f"[Audio Conversion Error] {e}")
            return file_path

    def extract_features(self, wav_file: str) -> np.ndarray:
        wav_file = self.convert_to_wav(wav_file)

        try:
            sound = parselmouth.Sound(wav_file)
            y, sr = librosa.load(wav_file, sr=None)
        except Exception as e:
            raise ValueError(f"Could not load audio: {e}")

        # Fundamental frequency (pitch)
        pitch, _, _ = librosa.pyin(y, fmin=75, fmax=500)
        if pitch is not None and len(pitch[~np.isnan(pitch)]) > 0:
            valid_pitch = pitch[~np.isnan(pitch)]
            fo = np.mean(valid_pitch)
            fhi = np.max(valid_pitch)
            flo = np.min(valid_pitch)
        else:
            fo = fhi = flo = 0

        # Jitter and shimmer
        try:
            point_process = parselmouth.praat.call(sound, "To PointProcess (periodic, cc)", 75, 500)
            jitter_percent = parselmouth.praat.call(point_process, "Get jitter (local)", 0, 0, 0.0001, 0.02, 1.3)
            shimmer = parselmouth.praat.call([sound, point_process], "Get shimmer (local)", 0, 0, 0.0001, 0.02, 1.3)
        except Exception:
            jitter_percent = shimmer = 0

        # Harmonics-to-noise ratio (HNR) and noise-to-harmonics ratio (NHR)
        try:
            harmonicity = sound.to_harmonicity_ac()
            hnr = parselmouth.praat.call(harmonicity, "Get mean", 0, 0)
            nhr = 1 / (hnr + 1e-6) if hnr > 0 else 0
        except Exception:
            hnr = nhr = 0

        # Detrended Fluctuation Analysis (DFA)
        try:
            y_finite = y[np.isfinite(y)]
            if len(y_finite) > 100:
                segment = y_finite[:min(len(y_finite), 1000)]
                dfa_val = dfa(segment)
            else:
                dfa_val = 0
        except Exception as e:
            print(f"DFA calculation error: {str(e)}")
            dfa_val = 0

        # Pitch variation features
        if pitch is not None and len(pitch[~np.isnan(pitch)]) > 1:
            valid_pitch = pitch[~np.isnan(pitch)]
            spread1 = np.std(valid_pitch)
            spread2 = np.mean(np.diff(valid_pitch))
            d2 = np.var(valid_pitch)
            ppe = np.std(np.log(valid_pitch + 1e-6))
        else:
            spread1 = spread2 = d2 = ppe = 0

        # MFCCs (10)
        try:
            mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=10)
            mfcc_features = np.mean(mfcc, axis=1)
        except Exception:
            mfcc_features = np.zeros(10)

        # Combine all features
        features = np.array([
            fo, fhi, flo, jitter_percent, shimmer, nhr, hnr,
            dfa_val, spread1, spread2, d2, ppe, *mfcc_features
        ])

        return features

    def predict(self, features: np.ndarray) -> tuple[str, float]:
        try:
            model = joblib.load(self.model_path)
            features_2d = features.reshape(1, -1)
            prediction = model.predict(features_2d)[0]
            proba = model.predict_proba(features_2d)[0][1]
            label = "Parkinsons" if prediction == 1 else "Healthy"
            return label, proba
        except Exception as e:
            print("Prediction error:", e)
            return "Unknown", 0.0
