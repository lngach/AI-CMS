import { Router } from 'express'
import Checkin from '../models/checkin'
import wifi from 'node-wifi'
import publicIP from 'public-ip'
import geoip from 'geoip-lite'
const router = Router()

router.get('/', (req, res, next) => {
  Checkin.findAll({ where: {userID: req.currentUser.id} }).then(checkins => {
    res.send(checkins)
  })
})

router.post('/', (req, res, next) => {
  wifi.init({iface: null})
  wifi.getCurrentConnections( async (err, currentConnection) => {
    if (err){
      next(err)
    } else {
        let user = req.currentUser
        let checkin = new Checkin()
        let geo = geoip.lookup(await publicIP.v4())
        checkin.userID = user.id
        checkin.checkinAt = new Date().toISOString()
        checkin.location = '39 Nguyễn Thị Diệu, P. 6, Q. 3, TP. HCM'
        checkin.WIFI = JSON.stringify(currentConnection[0])
        checkin.GPS = JSON.stringify(geo)
        checkin.valid = true
        checkin.createdAt = new Date().toISOString()
        checkin.updatedAt = new Date().toISOString()
        await checkin.save()
        res.send({message: 'checkin has been saved!'})
    }
  })
})

export default router
