const { default: sendEmail } = require("../../email.js");
const sql = require("./db.js");

const User = function (user) {

  let pass = user.name.split(" ")[0] + user.mobile;
  
  this.name= user.name, 
  this.mobile= user.mobile,
  this.e_mail= user.e_mail, 
  this.gender= user.gender, 
  this.dob= user.dob,
  this.retireAge= user.retireAge, 
  this.currentExpense= user.currentExpense, 
  this.inflation= user.inflation,
  this.news_letter= user.news_letter,
  this.password= pass
};


User.create = (newUser, result) => {
  sql.query(
    "SELECT * FROM user WHERE e_mail = ?",
    [newUser.e_mail],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      const resultArray = Object.values(JSON.parse(JSON.stringify(res)));
      if (resultArray.length == 0) {
        sql.query("INSERT INTO user SET ?", newUser, (err, resu) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          // sendEmail(newUser.e_mail,newUser.password)
          result(null, { id: resu.insertId, ...newUser });
        });
      } else {
        console.log("Email Already Exists!!!");
        result(null, "Email Already Exists!!!");
      }
    }
  );
};

User.getUser = (mobile, result) => {};

module.exports = User;
