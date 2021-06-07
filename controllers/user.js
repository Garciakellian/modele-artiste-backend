const bcrypt = require('bcrypt'); // declaration de bcrypt
const jwt = require('jsonwebtoken');//declaration json web token
const db = require('../mysqlconfig');
const dotenv = require("dotenv");
dotenv.config({path: './.env'});
const TOKEN = process.env.TOKEN;


exports.login = (req, res, next) => {
    const email = req.body.email
	  const password = req.body.password
	if (email && password) {
    //Selection dans la base de donné l'email donnée par l'user
      db.query('SELECT * FROM user WHERE email= ?', email, (error, results, _fields) => {
           if (results.length > 0) {
               if(password == results[0].password){
                res.status(200).json({//Atribue l'id, username, status et le token a l'utilisateur
                    email: results[0].email,
                    token: jwt.sign({ email: results[0].email},TOKEN,{ expiresIn: '24h' })
                  })
               }
               else{
                res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
               }
            }
          else {
            res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
          }
        }
      )
    } else {
      res.status(500).json({ message: "Entrez votre email et votre mot de passe" })
    }
  }