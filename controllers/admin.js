const db = require('../mysqlconfig');//Configuration information de connections mysql
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const base64ImageToFile = require('base64image-to-file'); 

exports.getArtiste = (req, res, next) => {
    db.query('SELECT * FROM artiste', (error, result, field) => {
       if (error) {
       return res.status(400).json({ error })
       }
   
       return res.status(200).json(result)
   })
   
   }


   exports.modifyImage = (req, res, next) => {

    const base64Image = req.body.image;
    let fileName = 'artiste'
    let imageName = fileName + '.jpeg'
  
    base64ImageToFile(base64Image, 'tmp/', fileName, function(err) {
      if(err) {
        return console.error(err);
      }
  
      db.query(`UPDATE artiste SET image='${imageName}' WHERE 1=1`, (error, result, field) => {
        if (error) {
          return res.status(400).json({ error })
        }
        return res.status(201).json({result})
      })
    })
  }

  exports.modifyTitre = (req, res, next) => {
    let titre = req.body.titre
    db.query(`UPDATE artiste SET titre='${titre}' WHERE 1=1`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }
  exports.modifySubtitle = (req, res, next) => {
    let subtitle = req.body.subtitle
    db.query(`UPDATE artiste SET subtitle='${subtitle}' WHERE 1=1`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

  exports.modifyText = (req, res, next) => {
    let text = req.body.text
    db.query(`UPDATE artiste SET text="${text}" WHERE 1=1`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

  exports.modifyCitationtitre = (req, res, next) => {
    let citation_titre = req.body.citation_titre
    db.query(`UPDATE artiste SET citation_titre="${citation_titre}" WHERE 1=1`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

  exports.modifyCitation = (req, res, next) => {
    let citation = req.body.citation
    db.query(`UPDATE artiste SET citation="${citation}" WHERE 1=1`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }