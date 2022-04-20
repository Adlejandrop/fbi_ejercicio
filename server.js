const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const secret = 'juegosdelhambre';
const {results:registered_agents} = require('./data/agentes.js')
const expirationTime = ()=> Math.floor(Date.now() / 1000) + 120

app.listen(port,()=>console.log(`servidor disponible en puerto ${port}`))

app.use(express.json())

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

const generateToken = (agent) =>{
    if(registered_agents.some((a)=>a.email === agent.email && a.password === agent.password)){

        return jwt.sign(
            {
                exp: expirationTime(),
                agent,
            },
            secret
            )
        } else{
            return false
        }
    }
    
app.get('/SignIn',(req,res)=>{
    const {query:agent} = req
    const validatedAgent = generateToken(agent);
    if(!validatedAgent){
        res.send('FUERA')

    }else{
        res.sendFile(__dirname + '/landing_agent.html');

    }

})


app.get("/token", (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secret, (err, data) => {
            res.send(err ? err : data);
        });
    });
        