const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection')
const User = require('./db/user')
const cors = require('cors')

//Middleware for pasing
app.use(express.json());

//enable cors
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true                // if using cookies or auth headers
}));
//registration
app.post('/register',async(req,res) =>{
    try{
        const {username,password} = req.body;
        console.log(req.body);
        const user = new User({username,password});
        await user.save();
        res.status(201).json({message:'registration successful'})
    }
    catch(error){
         res.status(500).json({error:'Registration Failed'});
    }
})

//Login
app.post('/login',async(req,res) =>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({eror:"Invalid username or pasword"});
        }

        if(user.password !== password){
            return res.status(401).json({eror:"Invalid username or pasword"});
        }
        res.status(200).json({mesage:'Login Sucessful'})
    }
    catch(error){
        res.status(500).json({error:'Login failed'})
    }
})

app.listen(port,()=>{
    console.log('Server is listening on Port 8000')
    connectDB();
}) 