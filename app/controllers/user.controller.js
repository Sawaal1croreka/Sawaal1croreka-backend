const User = require("../models/user.model.js");
const sql = require("../models/db.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a User
  const user = new User({
        name: req.body.name, 
        mobile: req.body.mobile,
        e_mail: req.body.e_mail, 
        gender: req.body.gender, 
        dob: req.body.dob,
        retireAge: req.body.retireAge, 
        currentExpense: req.body.currentExpense, 
        inflation: req.body.inflation,
        news_letter: req.body.news_letter,
        
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {
      res.send(data);
    }
  });
};

exports.getUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  sql.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params["id"]],
    (err, data) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } else {
        const resultArray = Object.values(JSON.parse(JSON.stringify(data)));
        if (resultArray.length !== 0) {
          return res.send(resultArray);
        } else {
          return res.send("No User Found")
        }
      }
    }
  );
};

exports.addData = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const currentMonthly= req.body.currentMonthly
        const fixedMonthly= req.body.fixedMonthly 
        const expectedGrowth=req.body.expectedGrowth 
        const expectedInvestment= req.body.expectedInvestment 
        const retirementCorpus= req.body.retirementCorpus 
        const id= req.body.id 


  sql.query(
    "UPDATE user SET currentMonthlyPassiveIncome = " + currentMonthly +", fixedMonthlyPassiveIncomeAfterRetirement = "+fixedMonthly+",expectedGrowthRateofPassiveIncome = "+expectedGrowth+", expectedInvestmentRate = "+expectedInvestment+",retirementCorpus = "+retirementCorpus+"  WHERE id="+id,
    (err, data) => {
      console.log(err);
      if (err) {
        res.send("failed")
      } else {
       res.send("success")
      }
    }
  );
};
