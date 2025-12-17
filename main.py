from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from assistant import Assistant
from prompts import SYSTEM_PROMPT
from app_state import get_llm, get_vector_store
from database import SessionLocal
from services.employee_service import get_employee_by_code, get_full_employee_profile


app = FastAPI(title="AxisConnect API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Models ----------
class ChatMessage(BaseModel):
    role: str
    content: str


class LoginRequest(BaseModel):
    employee_code: str
    email: str 


class ChatRequest(BaseModel):
    message: str
    employee_profile: dict
    history: List[ChatMessage]

@app.get("/")
def health():
    return {"status": "AxisConnect backend running"}



# ---------- Login ----------
@app.post("/login")
def login(data: LoginRequest):
    db = SessionLocal()
    try:
        emp = get_employee_by_code(db, data.employee_code)
        if not emp:
            raise HTTPException(status_code=404, detail="Employee not found")
        if not data.email:
            raise HTTPException(
                status_code=400,
                detail="Email is required"
            )

        if data.email:
            if not emp.email or emp.email.lower() != data.email.lower():
                raise HTTPException(
                    status_code=401,
                    detail="Employee code and email do not match"
                )
        return get_full_employee_profile(db, emp.id)
    finally:
        db.close()


# ---------- Chat ----------
@app.post("/chat")
def chat(request: ChatRequest):
    try:
        assistant = Assistant(
            system_prompt=SYSTEM_PROMPT,
            message_history=request.history
        )


        assistant.employee_information = request.employee_profile or {}

        chain = assistant.build_chain()
        reply = chain.invoke(request.message)

        return {"reply": reply}

    except Exception as e:
        print("🔥 CHAT ERROR:", e)
        raise HTTPException(status_code=500, detail="Internal server error")
