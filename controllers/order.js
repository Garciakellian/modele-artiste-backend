const paypal = require('paypal-rest-sdk');
const sessionStorage = require('sessionstorage');
const db = require('../mysqlconfig');//Configuration information de connections mysql


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfUNhcAFNLNpWB25CSPSDseNp0TDRQ5v2CakliBr3BOa8WkjDQ0y32tRQBEHncbWtV2J3bRvdywYJG9R',
    'client_secret': 'ELRIqKIJuRk0gEEABwYcOxSTuNBC622Y7c_ipPgYcfyCs3HG7AyJ-4mX0FQdCwe288ZyI-NcyQGolpa4'
  });


exports.order  = (req,res) =>{
    const prix = req.body.prix
    const titre = req.body.titre
    const id = req.body.id

    sessionStorage.setItem('id', id);


    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/api/success",
          "cancel_url": "http://localhost:3000/api/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": titre,
                  "sku": id,
                  "price": prix,
                  "currency": "CAD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "CAD",
              "total": prix,
          },
          "description": "Votre commade"
      }]
  };
console.log(create_payment_json);

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });

  };


exports.success = (req,res)=>{
  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };
  let id = sessionStorage.getItem('id');


  paypal.payment.execute(paymentId, payerId, function(error, payment){
    if(error){
      console.error(JSON.stringify(error));
    } else {
      if (payment.state == 'approved'){
        console.log('payment completed successfully');
      } else {
        console.log('payment not successful');
      }
    }



  });
  db.query(`UPDATE tableau SET vendu = 'Vendu' WHERE id=${id}`, (error, result, field) => {
    if (error) {
      return res.status(400).json({ error })
    }

    return res.redirect('http://localhost:8080/#/success');
  } )
  }
exports.cancel = (req,res)=>{res.send('Cancelled')}
