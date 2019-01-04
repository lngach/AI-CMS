import mysqlModel from 'mysql-model'
import * as CONFIG from '../config'

export const Provider = mysqlModel.createConnection({
    host: CONFIG.HOST,
    user: CONFIG.USER,
    password: CONFIG.PASSWORD,
    database: CONFIG.DATABASE
})