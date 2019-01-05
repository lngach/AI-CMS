import { Router } from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import * as CONFIG from '../config'
const router = Router()

router.post('/signin', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    if (username && password) {
        User.findOne({ where: {username: username}, attributes: ['id', 'username', 'email', 'password'] }).then(user => {
            if (user) {
                console.log(password)
                bcrypt.compare(password.toString(), user.password, (err, result) => {
                    if (err) {
                        next(err)
                    } else if (!result) {
                        res.send({message: 'Invalid password'})
                    } else {
                        let payload = { id: user.id, username: user.username, email: user.email }
                        let privateKey = fs.readFileSync('private.key')
                        let tokens = jwt.sign(payload, privateKey, {expiresIn: CONFIG.EXPIRESIN, algorithm: CONFIG.ALGORITHM})
                        user.tokens = tokens
                        user.save().then(() => {
                            res.send({tokens: tokens})
                        })
                    }
                })
            } else {
                res.send({message: 'User not found!'})
            }
        })
    } else {
        res.send({message: 'Please provide username and password'})
    }
})

router.post('/signout', (req, res, next) => {
    let authorizationToken = req.headers.authorization
    if (authorizationToken) {
        let tokens = authorizationToken.replace('Bearer ', '')
        let cert = fs.readFileSync('public.key')
        jwt.verify(tokens, cert, { algorithms: ['RS256'] }, (err, payload) => {
            if (err) {
                let error = new Error('Unauthorized')
                error.status = 400
                next(error)
            } else {
                User.findById(payload.id).then(user => {
                    if (user) {
                        user.tokens = null
                        user.save().then(() => {
                            res.status(200).send({ message: 'User has been logged out!' })
                        })
                    } else {
                        let error = new Error('Unauthorized')
                        error.status = 400
                        next(error)
                    }
                })
            }
        })
    } else {
        let error = new Error('Unauthorized')
        error.status = 400
        next(error)
    }
    
})

export default router
