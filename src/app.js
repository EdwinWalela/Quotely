const express = require('express');
const mongoose = require('mongoose');
const Quote = require('./models/quoteModel');

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const app = express();

mongoose.connect(DB_URI);

mongoose.connection
    .once('open',()=>console.log(`connected to db`))
    .on('error',console.log)

app.listen(PORT,()=>{
    console.log(`listening for requests on port ${PORT}`);
})

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post('/quote',(req,res) =>{
   Quote.countDocuments().then(count=>{
        let quoteBody = req.body.quotebody;
        let author = req.body.author;
        let index = count == 0 ? 0 : count++;
        new Quote({
            index : index,
            body : quoteBody,
            author : author,
            likes:0
        }).save()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
   }).catch(err=>{
       console.log(err);
       res.status(500).send(err);
   })
    res.status(200).send('OK');
})

app.get('/quote/:index',(req,res)=>{
    let index = req.params.index;
    Quote.findOne({index:index}).then(quote=>{
        res.status(200).send(quote);
    }).catch(err=>{
        console.log(err)
        res.status(500).send(err);
    })
})

app.post('/quote/like/:index',(req,res)=>{
    Quote.findOneAndUpdate({index:req.params.index},{$inc:{likes:1}})
        .then(quote=>{
            res.status(200).send('OK');
        }).catch(err=>{
            res.status(500).send('OK');
        })
})



