import numpy as np
import pickle
import re
import os
import logging
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from django.conf import settings

logger = logging.getLogger(__name__)


class MLModelService:
    _instance = None
    _model = None
    _tokenizer = None
    _label_encoder = None
    _loaded = False

    max_length = 50
    vocab_size = 10000

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MLModelService, cls).__new__(cls)
            cls._instance._load_models()
        return cls._instance

    def _load_models(self):
        models_path = settings.BASE_DIR
        model_path = os.path.join(models_path, "subreddit_lstm_model.keras")
        tokenizer_path = os.path.join(models_path, "tokenizer.pkl")
        encoder_path = os.path.join(models_path, "subreddit_label_encoder.pkl")

        logger.info(f"Loading models from: {models_path}")
        print(f"Loading models from: {models_path}")
        print(f"Model path: {model_path}, exists: {os.path.exists(model_path)}")
        print(f"Tokenizer path: {tokenizer_path}, exists: {os.path.exists(tokenizer_path)}")
        print(f"Encoder path: {encoder_path}, exists: {os.path.exists(encoder_path)}")

        try:
            self._model = load_model(model_path)
            logger.info(f"Model loaded successfully from {model_path}")
            print(f"Model loaded successfully!")

            with open(tokenizer_path, "rb") as f:
                self._tokenizer = pickle.load(f)
            logger.info(f"Tokenizer loaded successfully")
            print(f"Tokenizer loaded successfully!")

            with open(encoder_path, "rb") as f:
                self._label_encoder = pickle.load(f)
            logger.info(f"Label encoder loaded successfully")
            print(f"Label encoder loaded successfully!")
            
            self._loaded = True

        except FileNotFoundError as e:
            logger.error(f"Model files not found: {e}")
            print(f"ERROR: Model files not found: {e}")
            raise
        except Exception as e:
            logger.error(f"Failed to load models: {e}")
            print(f"ERROR: Failed to load models: {e}")
            raise

    @staticmethod
    def clean_text(text):
        text = text.lower()
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        text = re.sub(r'\@\w+|\#', '', text)
        text = re.sub(r'[^\w\s]', '', text)
        text = re.sub(r'\d+', '', text)
        return text

    def predict(self, text):
        cleaned_text = self.clean_text(text)

        sequence = self._tokenizer.texts_to_sequences([cleaned_text])
        padded_sequence = pad_sequences(
            sequence,
            maxlen=self.max_length,
            padding="post",
            truncating="post"
        )

        prediction = self._model.predict(padded_sequence, verbose=0)
        predicted_label = np.argmax(prediction, axis=1)[0]
        predicted_subreddit = self._label_encoder.inverse_transform([predicted_label])[0]
        confidence = float(prediction[0][predicted_label])

        return predicted_subreddit, confidence
