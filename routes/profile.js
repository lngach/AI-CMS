import { Router } from 'express'
import User from '../models/user'
const router = Router()

router.get('/', (req, res, next) => {
    res.send(req.currentUser)
})

router.post('/', (req, res, next) => {
    User.findById(req.currentUser.id, {attributes: ['id', 'name', 'avatar', 'email', 'username', 'signinCount', 'createdAt', 'updatedAt']}).then(user => {
        user.name = req.body.name
        user.avatar = req.body.avatar
        user.save().then(() => {
            res.send({message: 'Profile has been updated!', profile: user})
        })
    })
})

export default router