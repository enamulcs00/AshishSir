const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
 const db = "mongodb+srv://enamulcs00:Regional9@cluster0.jnxfy.mongodb.net/EnamAuth?retryWrites=true&w=majority"

 mongoose.connect(db,err=>{
     if(err){
         console.log('Error'+err)
     }else{
         console.log('Connected with Database')
     }
 });
function verifyToken(req,res,next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split('')[1]
    if (token=== 'null'){
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token,'secretkey')

    if (!payload){
     return res.status(401).send('Unauthorized Request')
    }

    req.userId = payload.subject
    next()
}

router.get('/',(req,res)=>{
    res.send('From api routes')
})
router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log('This is the Error: '+error)

        }else{
            let payload = {subject:registeredUser._id}
            let token = jwt.sign(payload,'secretkey')
            res.status(200).send({token})
        }
    })
})
router.post('/login',(req,res)=>{
    let userData = req.body

    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid Email Id')
            }else{
                if(user.password !==userData.password){
                    res.status(401).send('Invalid Password')
                }else{
                    let payload = { subject: user._id }
            let token = jwt.sign(payload,'secretkey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/events',(req,res)=>{
    let events = [
        {"id":"1",
        "name":"Enamul",
        "description":"Angular Auth",
        "date":"2012-04-23T18:25:43.511Z"
    },
    {"id":"2",
    "name":"Enamul",
    "description":"Angular Auth",
    "date":"2012-04-23T18:25:43.511Z"
},
{"id":"4",
"name":"Enamul",
"description":"Angular Auth",
"date":"2012-04-23T18:25:43.511Z"
},

{"id":"5",
"name":"Enamul",
"description":"Angular Auth",
"date":"2012-04-23T18:25:43.511Z"
},
{"id":"6",
"name":"Enamul",
"description":"Angular Auth",
"date":"2012-04-23T18:25:43.511Z"
},
{"id":"7",
"name":"Enamul",
"description":"Angular Auth",
"date":"2012-04-23T18:25:43.511Z"
},
    ]
    res.json(events)
})

router.get('/special',verifyToken,(req,res)=>{
    let events = [
        {"id":"1",
        "name":"Enamul",
        "description":"Angular Auth",
        "date":"2012-04-23T18:25:43.511Z"
    },
    {"id":"2",
    "name":"Enamul",
    "description":"Angular Auth",
    "date":"2012-04-23T18:25:43.511Z"
},
{"id":"4",
"name":"Enamul",
"description":"Angular Auth",
"date":"2012-04-23T18:25:43.511Z"
},

{"id":"5",
"name":"Enamul",
"description":"Angular Auth",
"date":"2012-04-23T18:25:43.511Z"
},
{"id":"6",
"name":"Enamul",
"description":"Angular Auth",
"date":"2012-04-23T18:25:43.511Z"
},
{"id":"7",
"name":"Enamul",
"description":"Angular Auth",
"date":"2012-04-23T18:25:43.511Z"
},
    ]
    res.json(events)
})
module.exports = router