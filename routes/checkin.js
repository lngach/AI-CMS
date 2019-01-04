import { Router } from 'express'
import { Checkin } from '../models/checkin'
const router = Router()

/* GET checkins listing. */
router.get('/', (req, res, next) => {
  res.send({message: 'checkin'})
})

export default router
