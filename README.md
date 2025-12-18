# 🚀 AxisConnect — AI-Powered Employee Self-Service (ESS) Chatbot

AxisConnect is an **AI-powered Employee Self-Service (ESS) chatbot** built with a **FastAPI backend** and a **React frontend**, using **Retrieval-Augmented Generation (RAG)** and a **Large Language Model (LLM)** to deliver personalized HR assistance.

It enables employees to log in, view their profile, and ask HR or policy-related questions with responses grounded in **company policy documents** and **employee database records**.

---

## 🔥 Key Features

### ✅ Employee Login

* Secure login using **Employee Code** and **Employee Email**
* Fetches employee profile from database
* Displays role, department, joining date, salary, leave, assets, and goals

---

### ✅ AI Chat Assistant (“Axis”)

* Powered by **Groq LLaMA 3.1 (8B Instant)**
* Context-aware conversation
* Combines:

  * Employee-specific data
  * Company HR policy documents (RAG)

---

### ✅ Retrieval-Augmented Generation (RAG)

* Loads HR policy PDFs
* Splits documents into chunks
* Embeds and stores them in **ChromaDB (in-memory)**
* Retrieves top relevant chunks per query
* Prevents hallucination by grounding answers in documents

---

### ✅ Modern Full-Stack Architecture

* **Backend**: FastAPI (REST APIs)
* **Frontend**: React
* **Database**: PostgreSQL (via SQLAlchemy)
* **Vector Store**: ChromaDB
* **LLM**: Groq API

---
## 🎥 Demo Video

Watch the full working demo of AxisConnect here:  
👉 https://youtu.be/2UdMtwAa0mI


## 🧠 Technology Stack

### **Backend**

* Python
* FastAPI
* SQLAlchemy ORM
* PostgreSQL (Supabase compatible)
* LangChain
* ChromaDB
* Groq LLaMA 3.1

### **Frontend**

* React
* Fetch-based API communication
* Environment-based backend configuration

### **AI / NLP**

* LangChain RAG pipeline
* HuggingFace embeddings (via `langchain-huggingface`)
* Groq LLM API

---

## 📁 Project Structure

```
AxisConnect1/
│
├── Axis/
│   ├── main.py              # FastAPI application entry point
│   ├── app_state.py         # Singleton LLM, embeddings & vector store
│   ├── assistant.py         # RAG + LLM orchestration logic
│   ├── database.py          # SQLAlchemy engine & session
│   ├── models.py            # ORM models (Employee, Salary, Leave, etc.)
│   ├── prompts.py           # System & chat prompts
│   ├── seed_data.py         # Seed script for sample employee data
│
│   ├── services/
│   │   └── employee_service.py   # Employee profile aggregation logic
│
│   ├── data/
│   │   └── *.pdf                 # HR policy documents
│
│   ├── frontend/                 # React frontend
│
│   ├── requirements.txt
│   ├── .env                      # Environment variables (ignored)
│   └── README.md
```

---
-



## 🛠️ Local Setup

### 1️⃣ Backend

```bash
cd Axis
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm start
```



## 🎯 Project Highlights (Interview-Ready)

* Full-stack AI application (React + FastAPI)
* Real RAG implementation (not just prompt stuffing)
* Token-safe prompt construction
* Scalable backend design
* Production-oriented architecture
* Clear separation of concerns

---

## 👤 Author

**Rishi**
AI & Full-Stack Developer

---


