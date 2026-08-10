# 🧠 Mental Health Score Predictor

An AI-powered Machine Learning web application that predicts an estimated mental health score based on lifestyle, academic, sleep, physical activity, stress, and social-media usage patterns.

The project combines a **Machine Learning model**, **FastAPI backend**, and a **responsive HTML/CSS/JavaScript frontend** to provide real-time predictions through a web interface.


## 🌐 Live Demo

### Backend API

**Live API:**  
https://mental-health-score-predictor-4-smn6.onrender.com

> The Render free instance may take some time to wake up after a period of inactivity.

✨ Features

🧠 Machine Learning based mental health score prediction

📊 Lifestyle and behavioral factor analysis

⚡ FastAPI REST API

🎨 Modern responsive frontend

✅ Input validation using Pydantic

🔄 Real-time prediction through API requests

🌍 Country-based feature grouping

📱 Responsive user interface

☁️ Cloud deployment using Render

🔗 Frontend-backend integration using REST API

🔐 CORS-enabled backend

📦 Serialized ML model using Joblib

🧩 Prediction Factors


The model uses the following user inputs:

Feature	Description

Age	Age of the student

Gender	Gender of the student

Country	Country of the student

Academic Level	Current academic level

Most Used Platform	Most frequently used social-media platform

Purpose Of Use	Primary purpose of social-media usage

Average Daily Usage Hours	Average daily social-media usage

Daily Unlocks	Number of daily device/app unlocks

Study Hours	Daily study duration

Physical Activity Hours	Daily physical activity duration

Sleep Hours Per Night	Average sleep duration

Stress Level	Current stress level


The backend validates these fields using a Pydantic model before sending the data to the ML pipeline.



🛠️ Tech Stack

Machine Learning

Python

Scikit-learn

Pandas

Joblib

Backend

FastAPI

Pydantic

Uvicorn

CORS Middleware

Frontend

HTML5

CSS3

JavaScript

Deployment

GitHub

Render


📂 Project Structure

Mental_Health_Score_Predictor/

│
├── .venv/

│
├── __pycache__/

│
├── basic.ipynb

│
├── main.py

├── Mental_Health_Model.pkl

│
├── index.html

├── style.css

├── script.js

│
├── requirements.txt

├── .python-version

│
├── README.md

└── LICENSE

⚙️ Installation & Setup

1. Clone the Repository
git clone https://github.com/Adarsh-0417/Mental_Health_Score_Predictor.git


2. Navigate to the Project
cd Mental_Health_Score_Predictor


3. Create a Virtual Environment
python -m venv .venv


4. Activate the Virtual Environment

Windows
.venv\Scripts\activate
macOS / Linux
source .venv/bin/activate


5. Install Dependencies
pip install -r requirements.txt
▶️ Run the Backend Locally
Start the FastAPI server using:
uvicorn main:app --reload --port 2200
The backend will be available at:
http://127.0.0.1:2200


🧠 What This Project Demonstrates

This project demonstrates practical experience with:

Machine Learning model deployment

Model serialization using Joblib

Scikit-learn pipelines

FastAPI REST API development

Pydantic data validation

Pandas data preprocessing

Frontend-backend integration

REST API communication

CORS configuration

Local API testing

Cloud deployment

Dependency version management

Production model compatibility


👨‍💻 Author

Adarsh Sharma


📄 License

This project is licensed under the MIT License.

See the LICENSE file for more information.

⭐ If you found this project useful, consider giving the repository a star!

