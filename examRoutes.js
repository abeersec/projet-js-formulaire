const express = require('express');
const router = express.Router();
const { identifiers } = require('../middlewares/identification');
const examController = require('../controllers/examController');

// Création d'un examen
router.post('/creer', identifiers, examController.createExam);

// (Exemple) Route pour calculer un score (à adapter selon l'usage réel)
// router.post('/calculer-score', identifiers, (req, res) => {
//   const { reponses, questions } = req.body;
//   const score = examController.calculateScore(reponses, questions);
//   res.json({ score });
// });

module.exports = router;
