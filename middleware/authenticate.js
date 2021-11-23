// Middleware is basically deals with registering a user, logging in and logging out. Also, we need to keep  checking  whether a user is currently logged in or not.


const jwt = require('jsonwebtoken')

const Auth = require('../models/Auth')

 const Authenticate =  async (req, res, next) =>{
          try {

            const token = req.cookies.jwtoken;
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
            const rootUser = await Auth.findOne({_id : verifyToken._id, "tokens:token": token});
            
            if(!rootUser){
            throw new Error('User not found..')
            }

            req.token = token;
            req.rootUser = rootUser;
            req.userId = rootUser._id;
            next();
          } catch (err) {
                res.status(400).json('Token invalid..')
          }  




}

module.exports = Authenticate
