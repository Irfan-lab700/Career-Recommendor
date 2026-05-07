import pickle

with open("model.pkl", "rb") as f:
    ensemble = pickle.load(f)

def predict_career(answers):
    proba = ensemble.predict_proba([answers])[0]
    confidence = max(proba)
    career = ensemble.predict([answers])[0]
    return career, confidence