from fastapi.testclient import TestClient
from app.main import app
client = TestClient(app)

def test_health():
    assert client.get('/health').json()['status'] == 'ok'

def test_summary_counts_and_averages():
    body = {'appointments':[{'status':'COMPLETED','wait_minutes':10},{'status':'NO_SHOW','wait_minutes':20}], 'labs':[]}
    result = client.post('/analytics/summary', json=body)
    assert result.status_code == 200
    assert result.json()['appointment_status_counts']['COMPLETED'] == 1
    assert result.json()['average_wait_minutes'] == 15
