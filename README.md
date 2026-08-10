# 🧠 Mental Health Score Predictor

An AI-powered Machine Learning web application that predicts an estimated mental health score based on lifestyle, academic, sleep, physical activity, stress, and social-media usage patterns.

The project combines a **Machine Learning model**, **FastAPI backend**, and a **responsive HTML/CSS/JavaScript frontend** to provide real-time predictions through a web interface.

> ⚠️ **Disclaimer:** This application provides an AI-generated estimate based on the information provided by the user. It is not a medical diagnosis and should not be considered a substitute for professional mental-health advice.

---

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

🏗️ System Architecture
                         USER
                           │
                           ▼
                ┌─────────────────────┐
                │      Frontend       │
                │   HTML / CSS / JS   │
                └──────────┬──────────┘
                           │
                           │ POST /predict
                           ▼
                ┌─────────────────────┐
                │      FastAPI        │
                │      Backend        │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Pydantic Input    │
                │     Validation      │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Feature Creation  │
                │    & Preprocessing  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Trained ML Model   │
                │ Mental_Health_      │
                │    Model.pkl        │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Predicted Mental    │
                │   Health Score      │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │      Frontend       │
                │   Display Result    │
                └─────────────────────┘

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

3. Navigate to the Project
cd Mental_Health_Score_Predictor

4. Create a Virtual Environment
python -m venv .venv

5. Activate the Virtual Environment

Windows
.venv\Scripts\activate
macOS / Linux
source .venv/bin/activate

6. Install Dependencies
pip install -r requirements.txt
▶️ Run the Backend Locally

Start the FastAPI server using:

uvicorn main:app --reload --port 2200
The backend will be available at:
http://127.0.0.1:2200

📖 API Documentation

FastAPI automatically generates interactive API documentation.

Open:

http://127.0.0.1:2200/docs

You can use the Swagger UI to test the /predict endpoint without the frontend.

🔌 API Endpoints
GET /

Returns a welcome message.

Example Response
{
  "message": "Welcome to the Mental Health Score Predictor API!"
}
POST /predict

Generates an estimated mental health score based on the submitted user information.

Request Body
{
  "Age": 21,
  "Gender": "Male",
  "Country": "India",
  "Academic_Level": "Undergraduate",
  "Most_Used_Platform": "YouTube",
  "Purpose_Of_Use": "Education",
  "Avg_Daily_Usage_Hours": 4.5,
  "Daily_Unlocks": 30,
  "Study_Hours": 5,
  "Physical_Activity_Hours": 1,
  "Sleep_Hours_Per_Night": 7,
  "Stress_Level": "Medium"
}
Example Response
{
  "predicted_mental_health_score": 72.43
}
🧪 API Request Example

The API can also be tested using Python:

import requests

url = "http://127.0.0.1:2200/predict"

data = {
    "Age": 21,
    "Gender": "Male",
    "Country": "India",
    "Academic_Level": "Undergraduate",
    "Most_Used_Platform": "YouTube",
    "Purpose_Of_Use": "Education",
    "Avg_Daily_Usage_Hours": 4.5,
    "Daily_Unlocks": 30,
    "Study_Hours": 5,
    "Physical_Activity_Hours": 1,
    "Sleep_Hours_Per_Night": 7,
    "Stress_Level": "Medium"
}

response = requests.post(url, json=data)

print(response.json())

🔄 How the Application Works
1. User Input

The user provides information related to:

Age
Gender
Country
Academic level
Social-media platform usage
Purpose of social-media usage
Daily usage
Device/app unlock frequency
Study hours
Physical activity
Sleep
Stress
2. Input Validation

The FastAPI backend uses Pydantic to validate incoming data.

Examples of validation rules include:

Age:
10 - 100

Average Daily Usage:
0 - 24 hours

Study Hours:
0 - 24 hours

Physical Activity:
0 - 24 hours

Sleep:
0 - 24 hours

Categorical fields are also restricted to predefined values.

3. Feature Preparation

After validation, the backend creates a Pandas DataFrame containing the submitted information.

Countries outside the predefined set are grouped into:

Other

This ensures consistency between the user input and the model's expected features.

4. Machine Learning Prediction

The trained model is loaded using Joblib:

model = joblib.load("Mental_Health_Model.pkl")

The prepared input DataFrame is then passed to the model:

prediction = model.predict(input_row)[0]
5. Result

The prediction is returned to the frontend:

{
  "predicted_mental_health_score": 72.43
}

The frontend then displays the estimated score to the user.

🌐 Frontend Integration

The frontend communicates with the FastAPI backend using JavaScript's fetch() API.

Example:

fetch("http://127.0.0.1:2200/predict", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    console.log(result.predicted_mental_health_score);
});

For production deployment, the frontend should use the deployed Render API URL instead of the local URL.

🔐 CORS Configuration

The FastAPI backend includes CORS middleware so that the frontend can communicate with the API.

Example configuration:

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

For production environments, CORS should ideally be restricted to the actual frontend domain.

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

⚠️ Disclaimer

This project is created for educational and experimental purposes.

The predicted score is an estimate generated by a Machine Learning model based on the information entered by the user.

It should not be interpreted as:

A medical diagnosis
A psychological diagnosis
Professional medical advice
A replacement for a qualified mental-health professional

If someone is experiencing significant mental-health concerns, they should seek appropriate professional support.

👨‍💻 Author
Adarsh Sharma

B.Tech Student | AI/ML & Generative AI Enthusiast

GitHub:
https://github.com/Adarsh-0417

📄 License

This project is licensed under the MIT License.

See the LICENSE file for more information.

⭐ If you found this project useful, consider giving the repository a star!


**Bas isko `README.md` mein pura replace karke paste kar de.**  
Ek cheez intentionally nahi likhi hai: **model ka exact algorithm, accuracy, R², etc.** Kyunki jo project files available hain unse woh confirm nahi hota. README mein imaginary metrics daalna LinkedIn-style fiction writing ho jaata
