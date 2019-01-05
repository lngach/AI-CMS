import { Router } from 'express'
import Checkin from '../models/checkin'
const router = Router()

router.get('/', (req, res, next) => {
  Checkin.findAll().then(checkins => {
    res.send(checkins)
  })
})

export default router
