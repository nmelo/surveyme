var express = require('express');
var router = express.Router();

var questions = require('../controllers/questions');

/* GET surveys listing. */
router.get('/', questions.findAll);
router.get('/:questionId', questions.find);
router.post('/', questions.create);
router.put('/:questionId', questions.update);
router.param('questionId',questions.load);
//router.del('/surveys/:surveyId', surveys.destroy);

module.exports = router;

