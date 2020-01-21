let orderTicketModel = require('./../models/orderTickets');
let theatreModel = require('./../models/theatres')
let router = require('express').Router();
let mail = require('./../lib/mail');

router.post('/orderTicket', function(req, res, next) {
  let email = req.body.email;
  let movieName = req.body.movieName;
  let theatreName = req.body.theatreName;
  let noOfSeats = req.body.noOfSeats;
    
  let newTicket = new orderTicketModel({
    email,
    movieName,
    theatreName,
    noOfSeats
  });

  
  theatreModel.findOne({name: theatreName},  (err, theatreDetails)=>{
    if(err) throw err;
    else{
      for(let screen of theatreDetails.screensDetail){
        if(screen.runningMovie == movieName){
          screen.bookedSeats = screen.bookedSeats + noOfSeats;
          screen.availableSeats = screen.availableSeats - noOfSeats;
        }
      }

      theatreModel.findOneAndUpdate({name: theatreName}, theatreDetails, (err, updatedData)=>{
        if(err) throw err;
        else{
          newTicket.save((err, data)=>{
            if(err) throw err;
            else {
              let subject= `Your Tickets to the movie ${data.movieName} in the Theatre ${data.theatreName}`;
              let text = `<h1>Thanks for booking on booktickets movie ticket booking app</h1>
                        <div><h3>You have booked <i>${data.noOfSeats}</i> tickets for the movie <i>${data.movieName}</i> in the Theatre <i>${data.theatreName}</i></h3></div>`
              mail.sendMail(data.email, subject, text, (err, responseDetails)=>{
                if(err) throw err;
                else res.status(200).json(data);
              })
            }
          })
        }
      })
    }
  })

  
  // res.status(200).json(payload);
});

module.exports = router;