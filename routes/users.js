import { Router } from 'express'
import User from '../models/user'
import Checkin from '../models/checkin'
const router = Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.findAll({include: [Checkin], attributes: ['id', 'name', 'avatar', 'username', 'email', 'sign_in_count', 'created_at', 'updated_at']}).then(users => {
    res.send(users)
  })
})

export default router
