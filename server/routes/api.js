/**
 * Created by Matías on 27/08/2017.
 */
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const Hotels = require("../models/hotel");

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));

// connect with MONGOLAB
mongoose.connect(process.env.MONGOLAB_URI, error => {
  if (error) console.error(error);
  else console.log('mongo connected');
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/hotels', (req, res) => {

  Hotels.find().then(hotels =>{
    res.status(200).json(hotels);
  })
  .catch(error =>{
    res.status(500).send(error);
  });
});

router.post('/hotels', (req, res)=> {

  let maxId = 0;

  Hotels.find({}).
  limit(1).
  sort('-uniqueCode').
  select('uniqueCode').
  exec((err,hotels)=>{
    hotels.map((hotel)=> {
      maxId = hotel.uniqueCode;
    });
  }).then(()=>{
    let newHotel = new Hotels( req.body );
    newHotel.uniqueCode = maxId + 1;

    newHotel.save((err,hotel) => {
      if (err){
        res.status(500).send(error);
      }
      res.status(200).json(hotel);
    })
  })
});

router.delete ('/hotels', (req, res)=> {

  Hotels.remove().then(hotels =>{
    res.status(200).json(hotels);
  })
  .catch(error =>{
    res.status(500).send(error);
  });
});

router.get('/hotels/:id', (req, res)=>{

  Hotels.find({"uniqueCode": req.params.id},(error,hotels)=>{

    if(error){
      res.status(500).send(error)
    }
    res.status(200).json(hotels);
  });
});

router.put('/hotels/:id', (req, res)=> {

  Hotels.find({"uniqueCode": req.params.id},(error,hotels)=>{

    if(error){
      res.status(500).send(error);
    }

    hotels.map((hotel)=>{
      hotel.name = req.body.name;
      hotel.stars = req.body.stars;
      hotel.image = req.body.image;
      hotel.price = req.body.price;
      hotel.save((error,hotel)=>{
          if(error){
          res.status(500).send(error);
        }
        res.status(200).json(hotel);
      });
    })
  });
});

router.delete('/hotels/:id', (req, res)=> {

  Hotels.find({"uniqueCode": req.params.id},(error,hotels)=>{

    if(error){
      res.status(500).send(error);
    }

    hotels.map((hotel)=>{
      hotel.remove((error,hotel)=>{
        if(error){
          res.status(500).send(error);
        }
        res.status(200).json(hotel);
      })
    });
  });
});

module.exports = router;
