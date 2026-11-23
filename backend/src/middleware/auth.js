const jwt = require('jsonwebtoken');
function authenticate(req,res,next) {
 const header = req.headers.authorization;
 if (!header?.startsWith('Bearer ')) return res.status(401).json({error:{message:'Authentication required',requestId:req.id}});
 try { req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET); next(); }
 catch { return res.status(401).json({error:{message:'Invalid or expired session',requestId:req.id}}); }
}
const allow = (...roles) => (req,res,next) => roles.includes(req.user?.role) ? next() : res.status(403).json({error:{message:'Insufficient permissions',requestId:req.id}});
module.exports = { authenticate, allow };
