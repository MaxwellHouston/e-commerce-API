const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {PORT} = require('./config');
const { query } = require('./DB/db');
const authRouter = require('./routes/authRouter');
const UserModel = require('./models/UserModel');
const user = new UserModel();

app.use(bodyParser.json());


app.use('/api/user', authRouter)


app.get('/', async (req, res) => {
    try{
        const result = await query('SELECT * FROM users',[]);
        res.send(result.rows)
    } catch(err){
        res.status(400).send(err.stack)
    }
    
    
})

app.get('/:email', async (req, res) => {
    const email = req.params.email;
    try{
        result = await user.getByEmail(email);
        res.send(result.rows);
    } catch (err){
        res.status(400).send(err.stack)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});


