import express from 'express';
const prepareUnspentOutputsController = require('../controllers/prepare-unspent-outputs.controller');

const router = express.Router();

router.get('/api/prepare-unspent-outputs/', prepareUnspentOutputsController.get);

export { router as prepareUnspentOutputsRouter };
