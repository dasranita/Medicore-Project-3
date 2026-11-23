const router=require('express').Router(); const {z}=require('zod'); const db=require('../lib/db'); const audit=require('../lib/audit'); const {allow}=require('../middleware/auth');
router.get('/',async(req,res,next)=>{try{
 const where=req.user.role==='PATIENT'?{patient:{userId:req.user.sub}}:{};
 const data=await db.appointment.findMany({where,include:{patient:{select:{id:true,fullName:true}},doctor:{include:{user:{select:{name:true}},department:true}}},orderBy:{startsAt:'asc'},take:100});res.json({data});
}catch(e){next(e)}});
router.post('/',allow('ADMIN','RECEPTIONIST','PATIENT'),async(req,res,next)=>{try{
 const body=z.object({patientId:z.string().optional(),doctorId:z.string().min(1),startsAt:z.string().datetime(),endsAt:z.string().datetime(),reason:z.string().max(500).optional()}).parse(req.body);
 const patientId=req.user.role==='PATIENT'?(await db.patient.findUnique({where:{userId:req.user.sub}}))?.id:body.patientId;
 if(!patientId)return res.status(400).json({error:{message:'Patient profile not found or patientId missing',requestId:req.id}});
 const start=new Date(body.startsAt),end=new Date(body.endsAt); if(end<=start)return res.status(400).json({error:{message:'Appointment end must be after start',requestId:req.id}});
 const conflict=await db.appointment.findFirst({where:{doctorId:body.doctorId,status:{in:['BOOKED','CONFIRMED']},startsAt:{lt:end},endsAt:{gt:start}}});
 if(conflict)return res.status(409).json({error:{message:'Doctor already has an appointment in this time range',requestId:req.id}});
 const data=await db.appointment.create({data:{patientId,doctorId:body.doctorId,startsAt:start,endsAt:end,reason:body.reason}});await audit(req.user.sub,'APPOINTMENT_BOOKED','Appointment',data.id,req.id);res.status(201).json({data});
}catch(e){next(e)}});
module.exports=router;
