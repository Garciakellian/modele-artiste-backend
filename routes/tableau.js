const express = require('express');
const router = express.Router();

const tableauCtrl = require('../controllers/tableau');

router.post('/posttableau', tableauCtrl.postTableau)
router.get('/gettableau', tableauCtrl.getTableau)
router.get('/getrandomtableau', tableauCtrl.getRandomTableau)
router.post('/deletetableau', tableauCtrl.deleteTableau)
router.get('/getonetableau/:id', tableauCtrl.getoneTableau)
router.post('/selltableau', tableauCtrl.sellTableau)
router.post('/unselltableau', tableauCtrl.unsellTableau)
router.post('/modifyTitre', tableauCtrl.modifyTitre)
router.post('/modifyArtiste', tableauCtrl.modifyArtiste)
router.post('/modifyPrix', tableauCtrl.modifyPrix)
router.post('/modifyFormat', tableauCtrl.modifyFormat)
router.post('/modifyMedium', tableauCtrl.modifyMedium)
router.post('/modifyImage', tableauCtrl.modifyImage)
router.post('/contact', tableauCtrl.contact)

module.exports = router;

