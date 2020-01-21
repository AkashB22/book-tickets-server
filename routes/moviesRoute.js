let movieModel = require('./../models/movies');
let theatreModel = require('./../models/theatres');
let router = require('express').Router();

router.post('/movie', function(req, res, next) {
  let name = req.body.name;
    
  let newmovie = new movieModel({
    name,
  })

  newmovie.save((err, data)=>{
    if(err) throw err;
    else res.status(200).json(data);
  });
  // res.status(200).json(payload);
});

router.get('/movie', (req, res)=>{
  movieModel.find({}, (err, data)=>{
    if(err) throw err;
    else res.status(200).json(data);
  });
})

router.get('/movie/threateRunningMovie', (req, res)=>{
  movieModel.aggregate([{
    "$lookup": {
      "from" : "theatres",
      "localField" : "name",
      "foreignField" : "screensDetail.runningMovie",
      "as" : "common"
    }
  }])
  .exec((err, data)=>{
    if(err) throw err;
    else res.status(200).json(data);
  })
})

module.exports = router;