// const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
const {MongoClient} = require('mongodb')

app.use(express.json())
app.use(cors({
  origin : "*"
}))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
  app.get("/",(req,res) => {
    res.send("Rental Estate Management System ")
  })

  const uri = "mongodb+srv://admin:admin@cluster0.mvx2new.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const db = client.db("web");
  const col = db.collection("auth");
  app.post('/register',(req,res) => {
      col.insertOne(req.body);
      res.send("Insert Successfull");
  })
  /////////////////////////////////
  

  app.get('/login/:em/:pass',async (req,res) => {
    const em = req.params.em
    const pass = req.params.pass
    const result = await col.find({email : em}).toArray()
    if(result.length>0){
        if (result[0].email == em && result[0].password == pass){
            res.send("found")
        }
        else{
            res.send("not found")
        }
    }
    else{
    res.send("not found")
    }
})

const col1 = db.collection("feedback");
app.post('/feedback',(req,res) => {
    col1.insertOne(req.body);
    res.send("Insert Successfull");
})

const col2 = db.collection("contact");
app.post('/contact',(req,res) => {
    col2.insertOne(req.body);
    res.send("Insert Successfull");
})