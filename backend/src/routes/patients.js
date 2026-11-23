const router=require('express').Router(); const {z}=require('zod'); const db=require('../lib/db'); const audit=require('../lib/audit'); const {allow}=require('../middleware/auth');
router.get('/',async(req,res,next)=>{try{
 const where=req.user.role==='PATIENT'?{userId:req.user.sub}:{};
 const rows=await db.patient.findMany({where,orderBy:{createdAt:'desc'},take:100,select:{id:true,fullName:true,email:true,phone:true,bloodGroup:true,createdAt:true}});res.json({data:rows});
}catch(e){next(e)}});
router.post('/',allow('ADMIN','RECEPTIONIST'),async(req,res,next)=>{try{
 const data=z.object({fullName:z.string().min(2).max(120),email:z.string().email().optional(),phone:z.string().max(30).optional(),bloodGroup:z.string().max(5).optional(),dateOfBirth:z.string().datetime().optional()}).parse(req.body);
 const patient=await db.patient.create({data:{...data,dateOfBirth:data.dateOfBirth?new Date(data.dateOfBirth):undefined}});
 await audit(req.user.sub,'PATIENT_CREATED','Patient',patient.id,req.id);res.status(201).json({data:patient});
}catch(e){next(e)}});
module.exports=router;
