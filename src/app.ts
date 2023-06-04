/* eslint-disable no-unused-vars */
import cors from 'cors'
import express, { Application } from 'express'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users', usersRouter)

export default app
