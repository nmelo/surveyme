var express = require('express');
var router = express.Router();


router.get('/:user_id/destroy', function(req, res, next) {
  User.destroy({
    where: {id: req.params.user_id}
  }).then(function() {
      res.redirect('/users');
    });
});

router.get('/:user_id/profile', function(req, res, next) {
  User
  .find({id: req.params.user_id })
  .then(function(user){
    res.send(user);
  });
});


module.exports = router;
