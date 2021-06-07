const express = require('express');
const router = express.Router();

const eventCtrl = require('../controllers/event');

router.post('/postevent', eventCtrl.postEvent);
router.get('/getevent', eventCtrl.getEvent);
router.get('/getlastevent', eventCtrl.getLastevent);
router.post('/deleteevent', eventCtrl.deleteEvent);
router.get('/getonetevent/:id', eventCtrl.getoneEvent);
router.post('/updatenom', eventCtrl.modifyNom);
router.post('/updateeventimage', eventCtrl.modifyImage);
router.post('/updatedescription', eventCtrl.modifyDescription);
router.post('/updatedate', eventCtrl.modifyDate);
router.post('/updatedate_fin', eventCtrl.modifyDate_fin);

module.exports = router;