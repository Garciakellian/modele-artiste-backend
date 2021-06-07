const db = require('../mysqlconfig');//Configuration information de connections mysql
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const base64ImageToFile = require('base64image-to-file');
const fs = require('fs');
const randomstring = require("randomstring");




exports.postEvent = (req, res, next) => {

    // declaration des constente
    const base64Image = req.body.image;
    let fileName = randomstring.generate();
    let imageName = fileName + '.jpeg'

    base64ImageToFile(base64Image, 'tmp/', fileName, function(err) {
      if(err) {
        return console.error(err);
      }

      const bindings = {//cration du corp de requete pour la base de donnée
        nom: req.body.nom,
        description: req.body.description,
        date: req.body.date,
        date_fin: req.body.date_fin,
        image: imageName,
      }
      const sqlQuery = "INSERT INTO `event` SET ?"//insertion dans la base de donnée
      const preparedStatement = db.format(sqlQuery, [bindings])//requete preparé = insertion sql avec le corp de la requete
      db.query(preparedStatement, (error, result, field) => {
        if (error) {
          return res.status(400).json({ error })
        }
        return res.status(201).json({ message: 'Votre evenement a été postée ! '})
      })
    })
  }

exports.getEvent = (req, res, next) => {
    db.query('SELECT * FROM event ORDER BY date_fin DESC', (error, result, field) => {
       if (error) {
       return res.status(400).json({ error })
       }
   
       return res.status(200).json(result)
   })
   
   }

exports.getLastevent = (req, res, next) => {
    db.query(' SELECT * FROM event ORDER BY date_fin DESC LIMIT 1', (error, result, field) => {
       if (error) {
       return res.status(400).json({ error })
       }
   
       return res.status(200).json(result)
   })
   
   }

exports.deleteEvent = (req, res, next) => {

    let image = req.body.image;
    
    fs.unlink('./tmp/' + image , (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    });


    db.query(//suprime un message de la base de donné via son id
      'DELETE FROM event WHERE id= ?', req.body.id, (error, results, fields) => {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json({ message: 'Votre message a bien été supprimé !' })
      }
    )
  }

exports.getoneEvent = (req, res, next) => {

    console.log(req.params.id);
    db.query(`SELECT id, nom, description, DATE_FORMAT(date, "%d/%m/%Y") AS date, DATE_FORMAT(date_fin, "%d/%m/%Y") AS date_fin, image FROM event WHERE id = ?;`, req.params.id, (error, result, field) => {
      if (error) {
        return res.status(400).json({error})
      }
      return res.status(200).json(result)
    } )
  }

exports.modifyNom = (req, res, next) => {
    let id = req.body.id;
    let nom = req.body.nom
    db.query(`UPDATE event SET nom ='${nom}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

exports.modifyDescription = (req, res, next) => {
    let id = req.body.id;
    let description = req.body.description
    db.query(`UPDATE event SET description ='${description}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

exports.modifyImage = (req, res, next) => {

    const base64Image = req.body.image;
    let id = req.body.id
    let fileName = randomstring.generate();
    let imageName = fileName + '.jpeg'
  
    base64ImageToFile(base64Image, 'tmp/', fileName, function(err) {
      if(err) {
        return console.error(err);
      }
  
      db.query(`UPDATE event SET image='${imageName}' WHERE id='${id}'`, (error, result, field) => {
        if (error) {
          return res.status(400).json({ error })
        }
        return res.status(201).json({result})
      })
    })
  }

exports.modifyDate = (req, res, next) => {
    let id = req.body.id;
    let date = req.body.date
    db.query(`UPDATE event SET date ='${date}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

exports.modifyDate_fin = (req, res, next) => {
    let id = req.body.id;
    let date_fin = req.body.date_fin
    db.query(`UPDATE event SET date_fin ='${date_fin}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }