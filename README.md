# 🧠 Mental Health Score Predictor

An end-to-end Machine Learning application that predicts an estimated mental health score from academic, lifestyle, sleep, stress, and social-media usage patterns.

The project combines a **Scikit-learn regression pipeline**, **FastAPI backend**, and **responsive web frontend** to provide real-time predictions through a deployed REST API.

---

## 🌐 Live Demo

**Live API:**  
https://mental-health-score-predictor-4-smn6.onrender.com

> The application is deployed on Render. The free instance may take a few moments to wake up after inactivity.

---

## 🎯 Project Overview

Mental health can be influenced by multiple behavioral and lifestyle factors. This project explores these relationships by using structured student data to estimate a **Mental Health Score**.

The system accepts user information such as:

- Academic level
- Study hours
- Sleep duration
- Physical activity
- Stress level
- Social-media usage
- Daily device/app unlocks
- Most-used platform
- Purpose of social-media usage
- Age, gender and country

The trained Machine Learning model processes these inputs and returns an estimated mental health score.

---

## 📊 Model Performance

Multiple regression approaches were evaluated using standard regression metrics.

| Model | R² Score | MAE | RMSE |
|------|---------:|----:|-----:|
| Linear Regression | 0.7398 | 0.5362 | 0.6760 |
| **Random Forest** | **0.8779** | **0.3467** | **0.4632** |
| Random Forest (Tuned) | 0.8651 | 0.3691 | 0.4868 |

### Final Model

The **Random Forest Regressor** achieved the strongest test performance:

- **R²:** 0.8779
- **MAE:** 0.3467
- **RMSE:** 0.4632

This represents a **13.81 percentage-point improvement in R²** over the Linear Regression baseline.

---

## ⚙️ Machine Learning Pipeline

The project uses a structured Scikit-learn preprocessing and modeling pipeline.

### Numerical Features

- Standard scaling
- Log transformation of `Study_Hours` to handle skewness

### Ordinal Feature
Stress_Level is encoded using an ordered mapping:
Low → Medium → High → Very High

###Categorical Features

Categorical variables are transformed using OneHotEncoder with unknown-category handling.

###Country Feature

Countries are grouped into broader categories before being passed into the model, reducing unnecessary categorical sparsity.

###Model
RandomForestRegressor
├── n_estimators: 200
├── max_depth: 15
├── min_samples_split: 5
├── min_samples_leaf: 2
└── random_state: 42

###🧠 Input Features

Feature	Description: 
Age	Student's -> age
Gender	-> Student gender
Country	-> Student's country
Academic Level	-> Current academic level
Most Used Platform	-> Most frequently used social-media platform
Purpose Of Use	-> Primary purpose of social-media usage
Average Daily Usage Hours	-> Daily social-media usage
Daily Unlocks	-> Number of daily device/app unlocks
Study Hours	-> Daily study duration
Physical Activity Hours	-> Daily physical activity duration
Sleep Hours Per Night	-> Average sleep duration
Stress Level	-> Reported stress level

###🛡️ API Validation

Incoming requests are validated using Pydantic before being passed to the Machine Learning pipeline.

This helps ensure that:

Required fields are present
Input types are validated
Invalid requests are rejected
Only validated data reaches the model

The backend also includes CORS configuration for frontend-backend communication.

###💻 Frontend

The application includes a responsive web interface built using:

HTML5
CSS3
JavaScript

The frontend communicates with the FastAPI backend through REST API requests and displays the prediction dynamically.

###📦 Model Serialization

The trained Scikit-learn pipeline is serialized using Joblib:

Mental_Health_Model.pkl

This allows the complete preprocessing + prediction pipeline to be loaded directly by the backend without rebuilding the model during inference.

###☁️ Deployment

The application is deployed using:

GitHub for source-code management
Render for cloud deployment
FastAPI for model serving

The deployed backend provides a REST endpoint for real-time prediction requests.

