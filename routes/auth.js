import { Router } from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import * as CONFIG from '../config'
const router = Router()

router.post('/signin', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    if (username && password) {
        User.findOne({ where: {username: username, password: password}, attributes: ['id', 'username', 'email'] }).then(user => {
            if (user) {
                let payload = { id: user.id, username: user.username, email: user.email }
                let privateKey = fs.readFileSync('private.key')
                let token = jwt.sign(payload, privateKey, {expiresIn: CONFIG.EXPIRESIN, algorithm: CONFIG.ALGORITHM})
                user.tokens = token
                user.save().then(() => {
                    res.send({token: token})
                })
            } else {
                res.send('Username or password invalid')
            }
        })
    } else {
        res.send('Please provide username and password')
    }
})

router.post('/signout', (req, res, next) => {
    res.send('signout')
})

export default router
