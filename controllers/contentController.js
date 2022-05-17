const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Operator, Content} = require('../models/models')
const ApiError = require('../error/apiError')
const config = require('config')
const uuid = require('uuid')
const path = require('path')
const { unlink } = require('fs')

class ContentController {
    async create (req, res, next) {
        const {name, url} = req.body
        const {file} = req.files

        const candidate = await Content.findOne({where: {name}})
        
        console.log("URL >", url);

        if (candidate)
            return next(ApiError.badRequest("Контент с таким именем уже существует"))

        const urlLocal = name + '.' + file.name.split('.')[1]
        const urlFinal = url + '.' + file.name.split('.')[1]

        if (file) {
            file.mv(path.resolve(__dirname, '..', 'static', urlLocal))
        }

        const contentCreated = await Content.create({
            name,
            url: urlFinal
        })

        if (contentCreated) {
            return res.json({message: "Контент успешно создан"})
        } else {
            return next(ApiError.badRequest('Не удалось создать контент'))
        }
        
    }

    async getAll (req, res, next) {
        const contents = await Content.findAll()

        return res.json(contents)
    }

    async delete (req, res, next) {
        const {id} = req.params

        const content = await Content.findByPk(id)
        const splittedPath = content.url.split("/")
        const path = "./static/" + splittedPath[splittedPath.length - 1]
        const contentIsDeleted = await content.destroy()
        
        /*REMOVING FILE*/
        unlink(path, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        })

        if (contentIsDeleted)
            return res.json({message: "Контент успешно удален"})
        else
            return next(ApiError.badRequest('Не удалось удалить контент'))
    }
}

module.exports = new ContentController()