
import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
 
      let {token} = req.cookies
     
      if(!token){
        return res.status(401).json({message:"No token provided", authenticated: false})
      }
      let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
      
      if(!verifyToken){
        return res.status(401).json({message:"Invalid token", authenticated: false})
      }
  
      req.userId = verifyToken.userId
      next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"Token verification failed", authenticated: false})
    }
}
export default isAuth