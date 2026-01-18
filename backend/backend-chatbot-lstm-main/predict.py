import numpy as np
import pickle
import re
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences

# Konstanta (harus sama dengan yang digunakan saat training)
max_length = 50
vocab_size = 10000

# Fungsi untuk membersihkan teks (sama dengan saat training)
def clean_text(text):
    text = text.lower()
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    text = re.sub(r'\@\w+|\#', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\d+', '', text)
    return text

# Load model dan file pendukung
print("Loading model and encoders...")
model = load_model("subreddit_lstm_model.keras")

with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

with open("subreddit_label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

print("Model loaded successfully!")

# Fungsi untuk melakukan prediksi
def predict_subreddit(text):
    # Bersihkan teks
    cleaned_text = clean_text(text)
    
    # Konversi ke sequence
    sequence = tokenizer.texts_to_sequences([cleaned_text])
    padded_sequence = pad_sequences(sequence, maxlen=max_length, padding="post", truncating="post")
    
    # Prediksi
    prediction = model.predict(padded_sequence, verbose=0)
    predicted_label = np.argmax(prediction, axis=1)[0]
    predicted_subreddit = label_encoder.inverse_transform([predicted_label])[0]
    confidence = prediction[0][predicted_label]
    
    return predicted_subreddit, confidence

# Test dengan beberapa contoh
if __name__ == "__main__":
    test_texts = [
        "I'm feeling really down and have no motivation.",
        "I'm having a lot of anxious thoughts lately.",
        "I can't sleep at night, my mind keeps racing.",
        "I feel so alone and isolated from everyone."
    ]
    
    print("\n" + "="*60)
    print("PREDIKSI SUBREDDIT")
    print("="*60)
    
    for text in test_texts:
        subreddit, confidence = predict_subreddit(text)
        print(f"\nText: {text}")
        print(f"Predicted Subreddit: {subreddit}")
        print(f"Confidence: {confidence:.2%}")
        print("-" * 60)
    
    # Interactive mode
    print("\n" + "="*60)
    print("MODE INTERAKTIF (ketik 'exit' untuk keluar)")
    print("="*60)
    
    while True:
        user_input = input("\nMasukkan teks untuk diprediksi: ")
        if user_input.lower() == 'exit':
            break
        
        subreddit, confidence = predict_subreddit(user_input)
        print(f"Predicted Subreddit: {subreddit}")
        print(f"Confidence: {confidence:.2%}")
