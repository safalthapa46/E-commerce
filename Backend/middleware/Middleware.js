const {expressjwt: expressJWT}= require("express-jwt")

const SecretKEY= process.env.SECRET_KEY

const verifyJWT= expressJWT({
    secret:SecretKEY,
    algorithms:["HS256"]
})

exports.jwtMiddleware=(req,res,next)=>{
    verifyJWT(req,res,(err)=>{
        if(err){
            return res.status(401).json({error:"Unauthorized person just accessed"});
        }
        next();
    }
)
}