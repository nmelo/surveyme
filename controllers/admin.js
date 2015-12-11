
var question = db.Question.create({ survey_id: 1, text : "text" });
db.Question.sync();

db.User.sync();
var user = User.create({ username: "admin", password: "admin" });
db.User.sync();
