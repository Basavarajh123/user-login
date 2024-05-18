

const express= require('express');
const {open}=require('sqlite')
const sqlite3 = require('sqlite3');
const cors = require('cors');
const path=require('path');

const databasePath=path.join(__dirname,"Login.db");

const app= express();
app.use(express());

app.use(cors());

app.use(express.json());

let database =null

const initializeDbAndServer=async()=>{
    try{
        database=await open({
            filename:databasePath,
            driver:sqlite3.Database
        });
        app.listen(4000,()=>{
            console.log('Server Running at http://localhost:4000/')
            
        });
    }catch(error){
        console.log(`Db error :${error}`);
        process.exit(1);
    }



};
initializeDbAndServer();





app.get('/user',async(request,response)=>{

    const query=`SELECT * FROM User`
    const data =await database.all(query);
    response.send(data) 
})

module.exports=app;