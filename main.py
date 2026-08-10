import joblib
from fastapi import FastAPI

model = joblib.load('Mental_Health_Model.pkl')

app = FastAPI()

@app.get("/")
def greet():
    return {"message": "Welcome to the Mental Health Score Predictor API!"}

@app.post("/predict")
def predict(data: dict):
    pass
