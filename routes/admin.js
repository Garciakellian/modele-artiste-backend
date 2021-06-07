const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');


router.get('/getartiste', adminCtrl.getArtiste)
router.post('/updateImage', adminCtrl.modifyImage)
router.post('/updateTitre', adminCtrl.modifyTitre)
router.post('/updateSubtitle', adminCtrl.modifySubtitle)
router.post('/updateText', adminCtrl.modifyText)
router.post('/updateCitationtitre', adminCtrl.modifyCitationtitre)
router.post('/updateCitation', adminCtrl.modifyCitation)


module.exports = router;