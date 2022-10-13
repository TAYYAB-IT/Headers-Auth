const bcrypt = require('bcrypt')
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
app.use(express.json());
app.post('/', async (req, res) => {
    console.log("Headers:", req.headers)
    console.log("Body:", req.body)
    const authorization=req.headers['authorization']
    if (authorization) {
        console.log("authorization:", authorization);
        if (bcrypt.compareSync(process.env.secret, authorization)) {  //secret is stored in the .ENV
            console.log("Authorized");
            return res.status(200).json({
                success: true,
                data: req.body
            })
        }
        else {
            return res.status(403).json({
                success: false,
                message: 'authorization header invalid',
            })
        }
    }
    else {
        return res.status(401).json({
            success: false,
            message: 'No authorization header'
        })
    }

})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is Active");
})

