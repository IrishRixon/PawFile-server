const express = require('express');
const petCardsRouter = express.Router();
const {
    getPetsCard
} = require('../../controllers/dashboard/petcards');

petCardsRouter.route('/getPetsCard').get(getPetsCard);

module.exports = petCardsRouter;