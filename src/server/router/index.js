import express from 'express'
const router = express.Router()

const universalLoader = require('../universal')

router.get('/', universalLoader)

module.exports = router