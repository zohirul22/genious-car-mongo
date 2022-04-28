const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require('cors');
const res = require('express/lib/response');
require('dotenv').config()

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Running Genious Serveis and shahin")

})




const uri = `mongodb+srv://${process.env.DV_USER}:${process.env.DV_PASS}@cluster0.d4waz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
await client.connect();

const serviceCollection = client.db('geniousCar').collection('service')
// Multiple app find
app.get('/service' , async(req ,res)=>{
    const query ={};
const cursor = serviceCollection.find(query);
const services = await cursor.toArray();
res.send(services)
});
// single app find
app.get ('/service/:id' , async(req ,res) =>{
const id =req.params.id;
const query ={_id:ObjectId(id)};
const service =await serviceCollection.findOne(query)
res.send(service)
})

// post
app.post('/service', async(req ,res) =>{
    const newService = req.body;
    const result = await serviceCollection.insertOne(newService);
    res.send(result)
})

// delete

app.delete('/service/:id' , async(req ,res)=>{
const id =req.params.id;
const query = {_id:ObjectId(id)};
const result = await serviceCollection.deleteOne(query);
res.send(result)



})

    }

    finally {

    }

}
run().catch(console.dir);



app.listen(port, () => {
    console.log("Lisiting to port", port)
})