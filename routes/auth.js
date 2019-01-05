import { Router } from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import * as CONFIG from '../config'
import isAuthorized from '../utils/isAuthorized'
import publicIP from 'public-ip'
const router = Router()

router.post('/signin', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    if (username && password) {
        User.findOne({ where: {username: username}, attributes: ['id', 'username', 'email', 'password', 'signinCount', 'currentSigninAt', 'currentSigninIP'] }).then(user => {
            if (user) {
                bcrypt.compare(password.toString(), user.password, async (err, result) => {
                    if (err) {
                        next(err)
                    } else if (!result) {
                        res.send({message: 'Invalid password'})
                    } else {
                        let payload = { id: user.id, username: user.username, email: user.email }
                        let privateKey = fs.readFileSync('private.key')
                        let tokens = jwt.sign(payload, privateKey, {expiresIn: CONFIG.EXPIRESIN, algorithm: CONFIG.ALGORITHM})
                        user.tokens = tokens
                        user.signinCount = user.signinCount + 1
                        user.lastSigninAt = user.currentSigninAt
                        user.lastSigninIP = user.currentSigninIP
                        user.currentSigninIP = await publicIP.v4()
                        user.currentSigninAt = new Date().toISOString()
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

router.post('/signout', isAuthorized, (req, res, next) => {
    User.findOne({where: {tokens: req.currentUser.tokens}}).then(user => {
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
})

export default router
