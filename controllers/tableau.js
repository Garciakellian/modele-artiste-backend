const db = require('../mysqlconfig');//Configuration information de connections mysql
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const base64ImageToFile = require('base64image-to-file');
const nodemailer = require('nodemailer');
const fs = require('fs');


exports.postTableau = (req, res, next) => {

    // declaration des constente
    const base64Image = req.body.image;
    let title = req.body.titre;
    let artiste = req.body.artiste;
    let fileName = title + "-" + artiste;
    let imageName = fileName.split(' ').join('_') + '.jpeg'

    base64ImageToFile(base64Image, 'tmp/', fileName.split(' ').join('_'), function(err) {
      if(err) {
        return console.error(err);
      }

      const bindings = {//cration du corp de requete pour la base de donnée
        titre: req.body.titre,
        artiste: req.body.artiste,
        prix: req.body.prix,
        format: req.body.format,
        medium: req.body.medium,
        image: imageName,
      }
      const sqlQuery = "INSERT INTO `tableau` SET ?"//insertion dans la base de donnée
      const preparedStatement = db.format(sqlQuery, [bindings])//requete preparé = insertion sql avec le corp de la requete
      db.query(preparedStatement, (error, result, field) => {
        if (error) {
          return res.status(400).json({ error })
        }
        return res.status(201).json({ message: 'Votre message a été postée ! '})
      })
    })
  }

exports.getTableau = (req, res, next) => {
   db.query('SELECT * FROM tableau  ORDER BY id DESC', (error, result, field) => {
      if (error) {
      return res.status(400).json({ error })
      }
  
      return res.status(200).json(result)
  })
  
  }

  exports.getRandomTableau = (req, res, next) => {
    db.query('SELECT * FROM tableau  ORDER BY RAND() LIMIT 3;', (error, result, field) => {
       if (error) {
       return res.status(400).json({ error })
       }
   
       return res.status(200).json(result)
   })
   
   }

  exports.deleteTableau = (req, res, next) => {

    let image = req.body.image;
    
    fs.unlink('./tmp/' + image , (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    });


    db.query(//suprime un message de la base de donné via son id
      'DELETE FROM tableau WHERE id= ?', req.body.id, (error, results, fields) => {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json({ message: 'Votre message a bien été supprimé !' })
      }
    )
  }


  exports.getoneTableau = (req, res, next) => {

    console.log(req.params.id);
    db.query(`SELECT * FROM tableau WHERE id=?`, req.params.id, (error, result, field) => {
      if (error) {
        return res.status(400).json({error})
      }
      return res.status(200).json(result)
    } )
  }

  exports.sellTableau = (req, res, next) => {
    let id = req.body.id;
    console.log(id);
    db.query(`UPDATE tableau SET vendu = 'Vendu' WHERE id=${id}`, (error, result, field) => {
      if (error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    } )
  }

  exports.unsellTableau = (req, res, next) => {
    let id = req.body.id;
    console.log(id);
    db.query(`UPDATE tableau SET vendu = 'A Vendre' WHERE id=${id}`, (error, result, field) => {
      if (error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    } )
  }

  exports.modifyTitre = (req, res, next) => {
    let id = req.body.id;
    let titre = req.body.titre
    db.query(`UPDATE tableau SET titre='${titre}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

  exports.modifyArtiste = (req, res, next) => {
    let id = req.body.id;
    let artiste = req.body.artiste
    db.query(`UPDATE tableau SET artiste='${artiste}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

  exports.modifyPrix = (req, res, next) => {
    let id = req.body.id;
    let prix = req.body.prix
    db.query(`UPDATE tableau SET prix='${prix}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

  exports.modifyFormat = (req, res, next) => {
    let id = req.body.id;
    let format = req.body.format
    db.query(`UPDATE tableau SET format='${format}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

  exports.modifyMedium = (req, res, next) => {
    let id = req.body.id;
    let medium = req.body.medium
    db.query(`UPDATE tableau SET medium='${medium}' WHERE id='${id}'`, (error, result, field) => {
      if(error) {
        return res.status(400).json({ error })
      }
      return res.status(200).json(result)
    })
  }

  
exports.modifyImage = (req, res, next) => {

  const base64Image = req.body.image;
  let title = req.body.titre
  let artiste = req.body.artiste
  let id = req.body.id
  let fileName = title + "-" + artiste;
  let imageName = fileName.split(' ').join('_') + '.jpeg'

  base64ImageToFile(base64Image, 'tmp/', fileName.split(' ').join('_'), function(err) {
    if(err) {
      return console.error(err);
    }

    db.query(`UPDATE tableau SET image='${imageName}' WHERE id='${id}'`, (error, result, field) => {
      if (error) {
        return res.status(400).json({ error })
      }
      return res.status(201).json({result})
    })
  })
}

exports.contact = (req,res,next) => {
  let nom = req.body.nom;
  let fromMail = req.body.email;
  let sujet = req.body.sujet;
  let message = req.body.message;
  let toMail = 'kellian.dev@gmail.com';

  let transport = nodemailer.createTransport({
    service:'gmail',
    auth: {
       user: toMail,
       pass: 'Gwendo24'
    }
});
  const mail = {
    from: fromMail,
    to: toMail,
    subject: sujet + " " + nom,
    text: message + "\n from : " + fromMail
  };
console.log(mail);
  transport.sendMail(mail, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      return res.status(200).json({ result })
    }
});
  
}