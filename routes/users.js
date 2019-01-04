import { Router } from 'express'
import { User } from '../models/user'
const router = Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send({message: 'user'})
})

export default router
