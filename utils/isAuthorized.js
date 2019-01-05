import User from '../models/user'
import fs from 'fs'
import jwt from 'jsonwebtoken'

const isAuthorized = (req, res, next) => {
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
                        next()
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
}

export default isAuthorized