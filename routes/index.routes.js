const express = require('express')
const indexController = require('../controllers/index.controller')
const loginRouter = require('../controllers/login')
const router = express.Router()

router.get('/info', indexController.indexPage)
router.get('/api/persons', indexController.getAllContact)
router.get('/api/persons/:id', indexController.getContactById)
router.put('/api/persons/:id', indexController.updateNumberOnly)
router.post('/api/persons', indexController.createContact)
router.delete('/api/persons/:id', indexController.deleteAllContact)
router.post('/api/users', indexController.userPath)
router.get('/api/users', indexController.getUsers)
router.post('/api/login', loginRouter)

module.exports = router
