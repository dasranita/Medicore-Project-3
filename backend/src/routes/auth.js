const router = require('express').Router();
const {z} = require('zod'); const bcrypt = require('bcryptjs'); const jwt = require('jsonwebtoken'); const db = require('../lib/db');
router.post('/login', async (req,res,next)=>{try{
 const input=z.object({email:z.string().email(),password:z.string().min(8)}).parse(req.body);
 const user=await db.user.findUnique({where:{email:input.email}});
 if(!user || !(await bcrypt.compare(input.password,user.passwordHash))) return res.status(401).json({error:{message:'Invalid email or password',requestId:req.id}});
 const token=jwt.sign({sub:user.id,role:user.role,email:user.email},process.env.JWT_SECRET,{expiresIn:'4h'});
 res.json({token,user:{id:user.id,name:user.name,email:user.email,role:user.role}});
 }catch(e){next(e)}});
module.exports=router;
