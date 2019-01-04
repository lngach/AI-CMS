import { Router } from 'express'
import Checkin from '../models/checkin'
const router = Router()

/* GET checkins listing. */
router.get('/', (req, res, next) => {
  Checkin.findAll().then(checkins => {
    res.send(checkins)
  })
})

export default router
