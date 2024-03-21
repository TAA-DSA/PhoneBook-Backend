const express = require('express')
const indexController = require('../controllers/index.controller')
const router = express.Router()

router.get('/info', indexController.indexPage)
router.get('/api/persons', indexController.getAllContact)
router.get('/api/persons/:id', indexController.getContactById)
router.put('/api/persons/:id', indexController.updateNumberOnly)
router.post('/api/persons', indexController.createContact)
router.delete('/api/persons/:id', indexController.deleteAllContact)
router.post('/api/users', indexController.userPath)
router.get('/api/users', indexController.getUsers)

module.exports = router
