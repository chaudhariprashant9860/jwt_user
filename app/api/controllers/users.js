const userModel = require('../models/users')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { token } = require('morgan')

const create = (req, res, next) => {
    const { name, email, password } = req.body

    userModel.create({
        name,
        email,
        password
    }, (err, result) => {
        if (err)
            next(err)
        else
            res.status(200).json({
                status: "succuss",
                message: "user added successfully",
                data: result
            })
    })
}

const login = (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, result) => {
        if (err)
            next(err)

        else {
            if (bcrypt.compare(req.body.password, result.password)) {
                const token = jwt.sign({id:result._id},req.app.get('secretKey'),{expiresIn:'1h'})
                res.json({
                    status :"Success",
                    message :"Succusfully Logged in",
                    data :{
                        user:result,
                        token:token
                    }
                })

            }
        }
    })
}
module.exports={create,login}