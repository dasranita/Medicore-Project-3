from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Literal

app = FastAPI(title="MediCore Analytics", version="1.0.0", description="Operational analytics for synthetic data only; does not provide diagnosis or treatment advice.")

class Appointment(BaseModel):
    status: Literal["BOOKED", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"]
    scheduled_minutes: int = Field(default=30, ge=1, le=1440)
    wait_minutes: int | None = Field(default=None, ge=0, le=10080)

class LabRecord(BaseModel):
    ordered_at: datetime
    completed_at: datetime | None = None

class MetricsRequest(BaseModel):
    appointments: list[Appointment] = Field(default_factory=list, max_length=10000)
    labs: list[LabRecord] = Field(default_factory=list, max_length=10000)

@app.get("/health")
def health():
    return {"status": "ok", "service": "medicore-analytics"}

@app.post("/analytics/summary")
def summary(payload: MetricsRequest):
    counts = {s: 0 for s in ["BOOKED", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"]}
    for appointment in payload.appointments:
        counts[appointment.status] += 1
    waits = [a.wait_minutes for a in payload.appointments if a.wait_minutes is not None]
    turnaround = [(lab.completed_at - lab.ordered_at).total_seconds() / 60 for lab in payload.labs if lab.completed_at]
    if any(x < 0 for x in turnaround):
        return {"error": "Lab completion cannot precede order time"}
    return {
        "appointment_count": len(payload.appointments),
        "appointment_status_counts": counts,
        "average_wait_minutes": round(sum(waits) / len(waits), 2) if waits else None,
        "completed_lab_count": len(turnaround),
        "average_lab_turnaround_minutes": round(sum(turnaround) / len(turnaround), 2) if turnaround else None,
    }
