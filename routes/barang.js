const express = require('express');
const router = express.Router();
const barang = require('../controllers/barang');
var restrict = require('../middleware/restrict'); 


router.post('/',restrict, barang.create);
router.post('/:id',restrict, barang.update);
router.get('/deletebyupdate/:id',restrict, barang.deleteByUpdate);
router.get('/',restrict, barang.renderbarang);
// router.get('/previewbarang/:id',restrict, barang.renderpreview);
router.get('/inputbarang',restrict, barang.renderinputbarang);
router.get('/updatebarang/:id',restrict, barang.renderupdate);

module.exports = router;