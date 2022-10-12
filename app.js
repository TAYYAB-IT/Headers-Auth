//JSON-->XML & XML-->JSON convertor


/* 
const convertor=require('xml-js') */
/* var xml =
'<?xml version="1.0" encoding="utf-8"?>' +
'<note importance="high" logged="true">' +
'    <title>Happy</title>' +
'    <todo>Work</todo>' +
'    <todo>Play</todo>' +
'</note>';
var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
console.log(result1, '\n', result2); */
/* const jsonObj = {
    key : 'your json obj',
    value: ['Tyb','Ali']
};
var options = {compact: true, ignoreComment: true, spaces: 4};
console.log(convertor.json2xml(JSON.stringify(jsonObj),options));
 */
const bcrypt = require('bcrypt')
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
app.use(express.json());
app.post('/', async (req, res) => {
    console.log("Headers:", req.headers)
    console.log("Body:", req.body)
    if (req.headers['authorization']) {
        console.log("authorization:", req.headers['authorization']);
        if (bcrypt.compareSync(process.env.secret, req.headers['authorization'])) {
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

