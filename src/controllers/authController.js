const authService = require('../services/authService');

const register = async(req, res)=>{
    return await authService.register(req, res);
}

const login = async(req, res)=>{
    return await authService.login(req, res);
}

module.exports = {
    register,
    login
};