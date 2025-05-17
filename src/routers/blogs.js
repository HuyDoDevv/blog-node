const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

router.get('/create', blogController.create);
router.post('/store', blogController.store);
router.get('/:slug', blogController.show);
router.get('/:id/edit', blogController.edit);
router.put('/:id', blogController.update);
router.delete('/:id', blogController.delete);
router.get('/', blogController.index);

module.exports = router;
