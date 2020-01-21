let theatreModel = require('./../models/theatres');
let router = require('express').Router();

router.post('/theatre', function(req, res, next) {
  let name = req.body.name;
  let noOfScreens = req.body.noOfScreens;
  let screensDetail = req.body.screensDetail;
    
  let newTheatre = new theatreModel({
    name,
    noOfScreens,
    screensDetail
  })

  newTheatre.save((err, data)=>{
    if(err) throw err;
    else res.status(200).json(data);
  });
  // res.status(200).json(payload);
});

router.put('/theatre', function(req, res, next) {
  let name = req.body.name;
  let noOfScreens = req.body.noOfScreens;
  let screensDetail = req.body.screensDetail;
  
  theatreModel.findOne({name}, (err, data)=>{
    if(err) throw err;
    else{
      let updateData = {
        noOfScreens : noOfScreens,
        screensDetail : screensDetail
      }
      let myTheatre = data;
      console.log(myTheatre);
      theatreModel.findOneAndUpdate({_id: myTheatre._id}, updateData, (err, updatedData)=>{
        if(err) throw err;
        else res.status(200).json(updatedData);
      })
    }
  })
  // res.status(200).json(payload);
});

router.get('/theatre', (req, res)=>{
  theatreModel.find({}, (err, data)=>{
    if(err) throw err;
    else res.status(200).json(data);
  });
});

router.get('/theatre/:name', (req, res)=>{
  theatreModel.find({name : req.params.name}, (err, data)=>{
    if(err) throw err;
    else res.status(200).json(data);
  });
});

router.delete('/theatre/:name', (req, res)=>{
  theatreModel.findOneAndDelete({name : req.params.name}, (err, data)=>{
    if(err) throw err;
    else res.status(200).json(data);
  });
});

module.exports = router;