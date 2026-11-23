const {describe,it,expect}=require('vitest');const request=require('supertest');const app=require('../src/app');
describe('health endpoint',()=>{it('returns healthy status',async()=>{const res=await request(app).get('/api/health');expect(res.status).toBe(200);expect(res.body.status).toBe('ok')})});
