const authService = require('../services/authService');

const register = async(req, res)=>{
    return await authService.register(req, res);
}

const login = async(req, res)=>{
    return await authService.login(req, res);
}
const checkUsernameAvailability = async(req, res)=>{
    try{
            const userName = req.query.userName;
            const availability = await authService.checkUsernameAvailability(userName);
            return res.status(200).json({isAvailable:availability});
        }catch(error){
            return res.status(500).json({message:'Internal server Error', error:error.message});
        }
}
module.exports = {
    register,
    login,
    checkUsernameAvailability
};