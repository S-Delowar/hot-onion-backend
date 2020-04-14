const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
const users = ["Asad", 'Moin', 'Sabed', 'Susmita', 'Sohana', 'Sabana'];


app.get('/foods', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("onlineFoods");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        //client.close();
      });
});

app.get('/features', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("features");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        //client.close();
      });
});

app.get('/orders', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("orders");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});

const students = ['sayed', 'delowar']
app.get('/foodss/:key', (req, res) => {
    const id = req.params.key;
    const name = students[id];
    res.send({id, name})
})


 app.get('/food/:id', (req, res) =>{
     const foodId = Number(req.params.id);    
    
     client = new MongoClient(uri, { useNewUrlParser: true });
     client.connect(err => {
         const collection = client.db("hotOnion").collection("onlineFoods");
         collection.find({id: foodId}).toArray((err, documents)=>{
             if(err){
                 console.log(err)
                 res.status(500).send({message:err});
             }
             else{
                 res.send(documents[0]);
                 console.log(documents[0])
             }
         });
         client.close();
       });
 });


app.post('/getFoodsByKey', (req, res) =>{
    const key = req.params.key;    
    const productKeys = req.body;
    console.log(productKeys);
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("onlineFoods");
        collection.find({key: {$in: productKeys} }).toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});

//delete
//update
// post
app.post('/addFood', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("onlineFoods");
        collection.insert(product, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});

app.post('/addFeature', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("features");
        collection.insert(product, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});

app.post('/placeOrder', (req, res) => {
    const oderDetails= req.body;
    oderDetails.orderTime = new Date()
    console.log(oderDetails);
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("orders");
        collection.insertOne(oderDetails, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`index.js listening at http://localhost:${port}`))
