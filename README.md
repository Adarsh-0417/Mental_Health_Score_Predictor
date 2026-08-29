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

`Stress_Level` is encoded using an ordered mapping:

```text
Low → Medium → High → Very High
