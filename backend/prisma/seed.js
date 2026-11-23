const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const db = new PrismaClient();
(async () => {
 const passwordHash = await bcrypt.hash('DemoPass123!', 10);
 const users = [
  ['MediCore Admin','admin@medicore.local','ADMIN'],['Dr. Demo','doctor@medicore.local','DOCTOR'],
  ['Reception Demo','reception@medicore.local','RECEPTIONIST'],['Patient Demo','patient@medicore.local','PATIENT'],
  ['Nurse Demo','nurse@medicore.local','NURSE'],['Lab Demo','lab@medicore.local','LAB_TECHNICIAN'],['Billing Demo','billing@medicore.local','BILLING_OFFICER']
 ];
 for (const [name,email,role] of users) await db.user.upsert({where:{email},update:{},create:{name,email,role,passwordHash}});
 const dept = await db.department.upsert({where:{name:'General Medicine'},update:{},create:{name:'General Medicine'}});
 const doctor = await db.user.findUnique({where:{email:'doctor@medicore.local'}});
 await db.doctor.upsert({where:{userId:doctor.id},update:{},create:{userId:doctor.id,specialization:'General Medicine',departmentId:dept.id}});
 const patientUser = await db.user.findUnique({where:{email:'patient@medicore.local'}});
 await db.patient.upsert({where:{userId:patientUser.id},update:{},create:{userId:patientUser.id,fullName:'Patient Demo',email:patientUser.email}});
 console.log('Seed complete. Demo password: DemoPass123!');
})().catch(e=>{console.error(e);process.exit(1)}).finally(()=>db.$disconnect());
