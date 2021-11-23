// Controller is used to handle what we do with request it's make short ourcode instead in writing     
// routes folder (means logic)

const AuthModel  = require('../models/Auth');
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcrypt');


//REGISTER
// /api/register 
module.exports.signup = async (req, res) => {
  const {username, email, password} = req.body;
  if(!username || !email || !password) {
    res.status(400).json('Please fill all fields..')
  }

     await AuthModel.findOne({email})
      .then(user=>{
          if(user){
            res.status(400).json({msg : 'User already exist'})
          }
      })
     

   bcrypt.genSalt(10, (err,salt) =>{
          
          if(err) {
            res.status(400).json({ err: "Registration failed" });
          }else{

            bcrypt.hash(password, salt , async  (err,hash)=>{
              const hashPassword = hash;
 
              const user = new AuthModel({username,email, password :hashPassword})
              await user.save()
              res.status(201).json({user : user,
                token  : generateToken({_id :  user._id}),
                success:  'Registerd Successfully'
                }
              );
            })
          }
          
      
   })

 
}
  
module.exports.login = async (req,res) => {
  const {username, password} = req.body;
    if(!username || !password) {
      res.status(400).json('Please fill all fields..')
    }

  try {
    
        const user = await AuthModel.findOne({username});
          if(!user) {
            res.status(400).json('Invalid credentials!')
          };
        const validated = await bcrypt.compare(req.body.password, user.password);
          if(!validated) {
            res.status(400).json("Invalid credentials!");
          };
        
          return res.status(200).json({
            user : user,
            token  : generateToken({_id :  user._id}),
            success:  'Login Successfully'
          });
          
  } catch (err) {
    res.status(400).json({msg : err})
  }

};



// Logout 
module.exports.logout = (req, res) =>{
    
    res.clearCookie('jwt', {path : '/'});
    res.send('User logout')
}