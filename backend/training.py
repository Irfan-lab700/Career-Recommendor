import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score
import pickle

data = pd.read_csv("data.csv")

X = data[[f"q{i}" for i in range(1, 11)]]
y = data["career"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

rf = RandomForestClassifier(
    n_estimators=300,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    class_weight='balanced',
    random_state=42
)

gb = GradientBoostingClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.1,
    random_state=42
)

ensemble = VotingClassifier(
    estimators=[('rf', rf), ('gb', gb)],
    voting='soft'
)

ensemble.fit(X_train, y_train)

y_pred = ensemble.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")

scores = cross_val_score(ensemble, X, y, cv=5)
print(f"Cross Val Accuracy: {scores.mean() * 100:.2f}%")

with open("model.pkl", "wb") as f:
    pickle.dump(ensemble, f)

def predict_career(answers):
    proba = ensemble.predict_proba([answers])[0]
    confidence = max(proba)
    career = ensemble.predict([answers])[0]
    return career, confidence 