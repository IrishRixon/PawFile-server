const qrRouter = require('express').Router();
const getPetDetailsQr = require('../../controllers/dashboard/qr');

qrRouter.route('/getPetProfileDetails/qr/:id').get(getPetDetailsQr);

module.exports = qrRouter;