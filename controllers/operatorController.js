const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Operator} = require('../models/models')
const ApiError = require('../error/apiError')
const config = require('config')

class OperatorController {
    async registration(req, res, next) {
    
        const {login, password} = req.body
    
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный логин или пароль'))
        }
    
        const candidate = await Operator.findOne({where: {login}})
    
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
    
        const hashPassword = await bcrypt.hash(password, 5)
        const operator = await Operator.create({
            login: login,
            password: hashPassword
        })
    
        const token = jwt.sign(
          {id: operator.id, login: operator.login}, 
          config.get("SECRET_KEY"), 
          {expiresIn: '24h'})
    
        return res.json({token})
    }
      
    async login(req, res, next) {
        const {login, password} = req.body
    
        if (!login)
            return next(ApiError.badRequest('Было передано пустое имя пользователя'))
    
        if(!password)
            return next(ApiError.badRequest('Был передан пустой пароль'))
    
        const operator = await Operator.findOne({where: {login}})
    
        if (!operator)
            return next(ApiError.internal('Такого пользователя не существует'))
    
        let comparePassword = bcrypt.compareSync(password, operator.password)
    
        if (!comparePassword)
            return next(ApiError.badRequest('Указан неверный пароль'))
    
        const token = jwt.sign(
            {id: operator.id, login: operator.login}, 
            config.get('SECRET_KEY'), 
            {expiresIn: '24h'})
    
        return res.json({token})
    }

    async setPassword(req, res, next) {
        const {id, password, newPassword} = req.body
    
        const operator = await Operator.findByPk(id)
    
        let comparePassword = bcrypt.compareSync(password, operator.password)
    
        if (!comparePassword)
            return next(ApiError.badRequest('Указан неверный пароль'))
    
        const hashNewPassword = await bcrypt.hash(newPassword, 5)
    
        operator.password = hashNewPassword;
        
        const isSaved = operator.save()
    
        if (isSaved)
            return res.json("Пароль успешно изменен")
        else
            return next(ApiError.badRequest("Пароль не удалось изменить"))
    }

    async getAll(req, res) {
        const operators = await Operator.findAll()
    
        return res.json(operators)
    }
    
    async deleteUser(req, res, next) {
        const {id} = req.params
    
        const operator = await Operator.findByPk(id)
    
        if (!operator)
          return next(ApiError.badRequest('Такого пользователя не существует'))
    
        const candidates = await Operator.findAll()
    
        if (candidates.length === 1)
            return next(ApiError.badRequest('Больше операторов удалять нельзя'))
        
    
        const deleteOperator = await Operator.destroy({where: {id}})
    
        if (deleteOperator) {
          return res.json({message: 'Пользователь успешно удален'})
        } else {
          return next(ApiError.badRequest('Не удалось удалить пользователя'))
        }
      }
}

module.exports = new OperatorController()