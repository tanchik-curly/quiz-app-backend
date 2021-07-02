const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");

import models from "../models";
import validateToken from "../middlewares/auth";
import Questions from "../models/questions";

//--------------------------------------
//registration/authorization

const genereteToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (password !== user.dataValues.password)
        res.status(400).json({ auth: false, message: "Password is invalid!" });
      else {
        const id = user.dataValues.id;
        const token = genereteToken(id);
        res.json({ auth: true, jwt_token: token });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        auth: false,
        message: "Your data has not been approved, try again!",
      });
    });
});

router.post("/auth/register", async (req, res) => {
  try {
    const user = models.User.build({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      position: req.body.position,
    });

    await user.save();

    const id = user.dataValues.id;
    const token = genereteToken(id);
    res.json({ auth: true, jwt_token: token });
  } catch {
    res.json({
      auth: false,
      message: "Your data are incorrect, try again!",
    });
  }
});

//---------------------------------------
//get quizzes data

router.get("/quizzes", async (req, res) => {
  await models.Quizzes.findAll({
    include: [
      {
        model: models.Questions,
        include: [{ model: models.Options }],
      },
    ],
  })
    .then((quizzes) => {
      res.json({ data: quizzes });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get("/quiz/:id", validateToken, async (req, res) => {
  await models.Quizzes.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: models.Questions,
        include: [
          {
            model: models.Options,
            attributes: ["option", "id"],
          },
        ],
      },
    ],
  })
    .then((quiz) => {
      res.json({ auth: true, data: quiz });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ auth: false, data: err });
    });
});

router.post("/options", validateToken, async (req, res) => {
  const responseArray = [];
  const response = [];
  let length = req.body.options.length;

  await req.body.options.forEach((option) => {
    models.Options.findAll({
      where: {
        questionId: option.id,
        correctOption: true,
      },
    })
      .then((quiz) => {
        let trueFlag = false;
        let falseFlag = false;
        let qId = null;

        quiz.forEach((dbOption) => {
          qId = dbOption.dataValues.questionId;

          if (dbOption.dataValues.option === option.value) {
            trueFlag = true;
            response.push({ id: dbOption.dataValues.id, option: true });

            //UNCOMMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

            // const review = models.QuizReview.create({
            //   optionId: dbOption.dataValues.id,
            //   answer: true,
            //   questionId: qId,
            //   quizId: req.body.quizId,
            //   userId: req.userId,
            // });
          } else {
            falseFlag = true;
            response.push({ id: dbOption.dataValues.id, option: false });

            // const review = models.QuizReview.create({
            //   optionId: dbOption.dataValues.id,
            //   answer: false,
            //   questionId: qId,
            //   quizId: req.body.quizId,
            //   userId: req.userId,
            // });
          }
        });
        if (trueFlag && falseFlag === false)
          responseArray.push({
            questionId: qId,
            correctOption: response,
            message: "Correct!",
          });
        else if (falseFlag && trueFlag === false)
          responseArray.push({
            questionId: qId,
            correctOption: response,
            message: "Sorry, wrong answer!",
          });
        else
          responseArray.push({
            questionId: qId,
            correctOption: response,
            message: "Partly correct answer!",
          });

        --length;

        if (length <= 0) {
          res.json({
            response: responseArray,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ auth: false, data: err });
      });
  });
});

//----------------------------------------------
//check on completed quiz

router.get("/scores/:id", validateToken, async (req, res) => {
  await models.QuizReview.findAll({
    where: { quizId: req.params.id, userId: req.userId },
    attributes: ["answer", "optionId", "questionId"],
  })
    .then((quiz) => {
      res.json({ auth: true, data: quiz });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ auth: false, data: err });
    });
});

module.exports = router;
