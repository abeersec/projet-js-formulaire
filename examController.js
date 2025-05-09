const crypto = require('crypto');
const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.createExam = async (req, res) => {
  try {
    const exam = new Exam({
      ...req.body,
      createur: req.user.userId,
      lienUnique: crypto.randomBytes(16).toString('hex')
    });
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.calculateScore = (reponses, questions) => {
  let score = 0;
  reponses.forEach((rep, index) => {
    const question = questions[index];
    if (question.type === 'qcm') {
      const correctAnswers = question.options.filter(opt => opt.correct).map(opt => opt.text);
      if (arraysEqual(rep.reponses, correctAnswers)) score += question.note;
    } else {
      const tolerance = question.tolerance / 100;
      const similarity = stringSimilarity(rep.reponse, question.reponseDirecte);
      if (similarity >= (1 - tolerance)) score += question.note;
    }
  });
  return score;
};

// Helper: Comparaison de similarité textuelle
function stringSimilarity(a, b) {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  return (longer.length - levenshtein(a, b)) / longer.length;
}

// Ajout de la fonction utilitaire arraysEqual
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Ajout de la fonction utilitaire levenshtein
function levenshtein(a, b) {
  const matrix = [];
  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}