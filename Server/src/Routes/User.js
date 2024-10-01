const {Router} = require('express');
const { check_auth } = require('../Middleware/Passport');

const userRouter = Router();

userRouter.route('/').get(
    check_auth,
    (req,res)=>{
        res.json({messege:"Hi, How are you!"})
    }
)

module.exports = {
    userRouter
}