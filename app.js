import createError from 'http-errors'
import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import checkinsRouter from './routes/checkins'
import authRouter from './routes/auth'
import isAuthorized from './utils/isAuthorized'

var app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use(isAuthorized)
app.use('/users', usersRouter)
app.use('/checkins', checkinsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error message
    res.status(err.status || 500)
    res.send({error: err.message + ' ' + err.status || 500})
})

module.exports = app
