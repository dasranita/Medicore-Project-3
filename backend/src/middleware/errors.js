function notFound(req,res){res.status(404).json({error:{message:'Route not found',requestId:req.id}})}
function errors(err,req,res,next){ const invalid = err.name === 'ZodError'; const status = invalid ? 400 : (err.status || 500); console.error({requestId:req.id,message:err.message}); res.status(status).json({error:{message:invalid?'Invalid request data':(err.status?err.message:'Internal server error'),requestId:req.id}}); }
module.exports = {notFound,errors};
