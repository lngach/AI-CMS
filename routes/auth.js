import { Router } from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = Router()

router.post('/signin', (req, res, next) => {
    res.send('signin')
})

router.post('/signout', (req, res, next) => {
    res.send('signout')
})

export default router
