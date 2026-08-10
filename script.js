const API_BASE_URL = "https://mental-health-score-predictor-1-syqz.onrender.com";
const PREDICT_ENDPOINT = `${API_BASE_URL}/predict`;

const form = document.getElementById("assessmentForm");
const steps = Array.from(document.querySelectorAll(".form-step"));
const progressSteps = Array.from(document.querySelectorAll(".progress-step"));
const progressFill = document.getElementById("progressFill");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const apiErrorEl = document.getElementById("apiError");

const loadingState = document.getElementById("loadingState");
const resultState = document.getElementById("resultState");
const assessmentCard = document.querySelector(".assessment-card");

let currentStep = 1;
const totalSteps = steps.length;

// ---- Slider live readouts ------------------------------------------------
const sliderConfigs = [
  { id: "Avg_Daily_Usage_Hours", unit: "hrs" },
  { id: "Study_Hours", unit: "hrs" },
  { id: "Physical_Activity_Hours", unit: "hr" },
  { id: "Sleep_Hours_Per_Night", unit: "hrs" },
];

sliderConfigs.forEach(({ id }) => {
  const input = document.getElementById(id);
  const out = document.getElementById(`${id}_out`);
  if (!input || !out) return;

  const update = () => {
    const val = parseFloat(input.value);
    const unit = val === 1 ? "hr" : "hrs";
    out.textContent = `${val} ${unit}`;
  };
  input.addEventListener("input", update);
  update();
});

// ---- Step navigation ------------------------------------------------------

function renderStep() {
  steps.forEach((step) => {
    step.classList.toggle("is-active", Number(step.dataset.step) === currentStep);
  });

  progressSteps.forEach((el) => {
    const stepNum = Number(el.dataset.step);
    el.classList.toggle("is-active", stepNum === currentStep);
    el.classList.toggle("is-done", stepNum < currentStep);
  });

  progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

  prevBtn.hidden = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  nextBtn.hidden = isLastStep;
  submitBtn.hidden = !isLastStep;

  clearApiError();
}

function goNext() {
  if (!validateStep(currentStep)) return;
  if (currentStep < totalSteps) {
    currentStep += 1;
    renderStep();
    assessmentCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function goPrev() {
  if (currentStep > 1) {
    currentStep -= 1;
    renderStep();
  }
}

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

// ---- Validation ------------------------------------------------------------

function setFieldError(name, message) {
  const errorEl = form.querySelector(`[data-error-for="${name}"]`);
  const fieldEl = errorEl ? errorEl.closest(".field") : null;
  if (errorEl) errorEl.textContent = message || "";
  if (fieldEl) fieldEl.classList.toggle("has-error", Boolean(message));
}

// Field-by-field validators, keyed by input name.
const validators = {
  Age: (v) => {
    const n = Number(v);
    if (v === "" || Number.isNaN(n)) return "Age is required.";
    if (n < 10 || n > 100) return "Age must be between 10 and 100.";
    return "";
  },
  Gender: (v) => (v ? "" : "Please select a gender."),
  Country: (v) => (v.trim() ? "" : "Country is required."),
  Academic_Level: (v) => (v ? "" : "Please select an academic level."),
  Most_Used_Platform: (v) => (v ? "" : "Please select a platform."),
  Purpose_Of_Use: (v) => (v ? "" : "Please select a purpose."),
  Avg_Daily_Usage_Hours: (v) => {
    const n = Number(v);
    if (Number.isNaN(n) || n < 0 || n > 24) return "Must be between 0 and 24.";
    return "";
  },
  Daily_Unlocks: (v) => {
    const n = Number(v);
    if (v === "" || Number.isNaN(n)) return "Daily unlocks is required.";
    if (n < 0) return "Must be zero or greater.";
    return "";
  },
  Study_Hours: (v) => {
    const n = Number(v);
    if (Number.isNaN(n) || n < 0 || n > 24) return "Must be between 0 and 24.";
    return "";
  },
  Physical_Activity_Hours: (v) => {
    const n = Number(v);
    if (Number.isNaN(n) || n < 0 || n > 24) return "Must be between 0 and 24.";
    return "";
  },
  Sleep_Hours_Per_Night: (v) => {
    const n = Number(v);
    if (Number.isNaN(n) || n < 0 || n > 24) return "Must be between 0 and 24.";
    return "";
  },
  Stress_Level: (v) => (v ? "" : "Please select a stress level."),
};

// Which field names live on each step.
const stepFields = {
  1: ["Age", "Gender", "Country"],
  2: ["Academic_Level", "Most_Used_Platform", "Purpose_Of_Use"],
  3: ["Avg_Daily_Usage_Hours", "Daily_Unlocks", "Study_Hours", "Physical_Activity_Hours", "Sleep_Hours_Per_Night"],
  4: ["Stress_Level"],
};

function getFieldValue(name) {
  const radioGroup = form.querySelectorAll(`[name="${name}"][type="radio"]`);
  if (radioGroup.length) {
    const checked = form.querySelector(`[name="${name}"]:checked`);
    return checked ? checked.value : "";
  }
  const el = form.elements[name];
  return el ? el.value : "";
}

function validateStep(stepNum) {
  const fields = stepFields[stepNum] || [];
  let isValid = true;

  fields.forEach((name) => {
    const value = getFieldValue(name);
    const validator = validators[name];
    const message = validator ? validator(value) : "";
    setFieldError(name, message);
    if (message) isValid = false;
  });

  return isValid;
}

function validateAll() {
  let isValid = true;
  for (let i = 1; i <= totalSteps; i += 1) {
    const stepValid = validateStep(i);
    if (!stepValid) isValid = false;
  }
  return isValid;
}

// ---- API error helpers -------------------------------------------------

function showApiError(message) {
  apiErrorEl.textContent = message;
  apiErrorEl.hidden = false;
}

function clearApiError() {
  apiErrorEl.hidden = true;
  apiErrorEl.textContent = "";
}

// ---- Building the payload -------------------------------------------------

function buildPayload() {
  return {
    Age: Number(getFieldValue("Age")),
    Gender: getFieldValue("Gender"),
    Country: getFieldValue("Country").trim(),
    Academic_Level: getFieldValue("Academic_Level"),
    Most_Used_Platform: getFieldValue("Most_Used_Platform"),
    Purpose_Of_Use: getFieldValue("Purpose_Of_Use"),
    Avg_Daily_Usage_Hours: Number(getFieldValue("Avg_Daily_Usage_Hours")),
    Daily_Unlocks: Number(getFieldValue("Daily_Unlocks")),
    Study_Hours: Number(getFieldValue("Study_Hours")),
    Physical_Activity_Hours: Number(getFieldValue("Physical_Activity_Hours")),
    Sleep_Hours_Per_Night: Number(getFieldValue("Sleep_Hours_Per_Night")),
    Stress_Level: getFieldValue("Stress_Level"),
  };
}

// ---- Submission -------------------------------------------------------

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearApiError();

  if (!validateAll()) {
    // Jump back to the first invalid step so the user sees the error.
    for (let i = 1; i <= totalSteps; i += 1) {
      const hasError = (stepFields[i] || []).some((name) => {
        const message = validators[name] ? validators[name](getFieldValue(name)) : "";
        return Boolean(message);
      });
      if (hasError) {
        currentStep = i;
        renderStep();
        break;
      }
    }
    return;
  }

  const payload = buildPayload();

  setSubmitting(true);
  form.hidden = true;
  loadingState.hidden = false;

  try {
    const response = await fetch(PREDICT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 422) {
      throw new Error("VALIDATION");
    }
    if (response.status >= 500) {
      throw new Error("SERVER");
    }
    if (!response.ok) {
      throw new Error("UNKNOWN");
    }

    const data = await response.json();
    showResult(data.predicted_mental_health_score);
  } catch (err) {
    loadingState.hidden = true;
    form.hidden = false;
    setSubmitting(false);

    if (err.message === "VALIDATION") {
      showApiError("Some of your answers didn't pass validation. Please review the form and try again.");
    } else if (err.message === "SERVER") {
      showApiError("Something went wrong while generating the prediction. Please try again.");
    } else if (err instanceof TypeError) {
      // fetch() throws a TypeError on network failure / CORS / server down.
      showApiError("Unable to connect to the prediction server. Please make sure the FastAPI backend is running.");
    } else {
      showApiError("Something went wrong while generating the prediction. Please try again.");
    }
  }
});

function setSubmitting(isSubmitting) {
  submitBtn.disabled = isSubmitting;
  submitBtn.querySelector(".btn-label").textContent = isSubmitting
    ? "Analyzing…"
    : "Predict My Score";
}

// ---- Result rendering -------------------------------------------------

const SCORE_RING_CIRCUMFERENCE = 2 * Math.PI * 96; // matches r=96 in the SVG

function classifyScore(score) {
  if (score < 40) {
    return {
      label: "Needs Attention",
      className: "needs-attention",
      color: "#ff8a8a",
      note: "Your responses suggest your current routine may be taking a toll. Small, consistent changes to sleep and stress management can help.",
    };
  }
  if (score < 60) {
    return {
      label: "Moderate",
      className: "moderate",
      color: "#ff9f7a",
      note: "You're holding steady, with some room to improve balance between study, rest, and screen time.",
    };
  }
  if (score < 80) {
    return {
      label: "Good",
      className: "good",
      color: "#8fe3d6",
      note: "Your habits are largely supporting your wellbeing. Keep an eye on the areas that feel most stretched.",
    };
  }
  return {
    label: "Excellent",
    className: "excellent",
    color: "#a8f0c6",
    note: "Your responses reflect a strong, well-balanced routine. Keep doing what's working for you.",
  };
}

function showResult(rawScore) {
  const score = Math.max(0, Math.min(100, Number(rawScore) || 0));
  const info = classifyScore(score);

  loadingState.hidden = true;
  resultState.hidden = false;

  const scoreValueEl = document.getElementById("scoreValue");
  const scoreProgressEl = document.getElementById("scoreProgress");
  const classificationEl = document.getElementById("scoreClassification");
  const noteEl = document.getElementById("scoreNote");

  classificationEl.textContent = info.label;
  classificationEl.className = `score-classification ${info.className}`;
  noteEl.textContent = info.note;
  scoreProgressEl.style.stroke = info.color;

  // Animate the ring fill from 0.
  scoreProgressEl.style.strokeDasharray = `${SCORE_RING_CIRCUMFERENCE}`;
  scoreProgressEl.style.strokeDashoffset = `${SCORE_RING_CIRCUMFERENCE}`;

  // Animate the numeric readout.
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = score * eased;
    scoreValueEl.textContent = currentValue.toFixed(2);

    const offset = SCORE_RING_CIRCUMFERENCE * (1 - eased * (score / 100));
    scoreProgressEl.style.strokeDashoffset = `${offset}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      scoreValueEl.textContent = score.toFixed(2);
    }
  }
  requestAnimationFrame(tick);
}

// ---- Retake / navigation -------------------------------------------------

document.getElementById("retakeBtn").addEventListener("click", () => {
  resultState.hidden = true;
  form.hidden = false;
  form.reset();
  sliderConfigs.forEach(({ id }) => {
    document.getElementById(id).dispatchEvent(new Event("input"));
  });
  currentStep = 1;
  renderStep();
  setSubmitting(false);
  document.getElementById("assessment").scrollIntoView({ behavior: "smooth", block: "start" });
});

// ---- Scroll reveal animations -------------------------------------------------

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ---- Init -------------------------------------------------------------

renderStep();

if (window.lucide) {
  window.lucide.createIcons();
}
