import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = '93478b141dc8f6967ea24cf337407c09-us21';
const url = 'https://us21.api.mailchimp.com/3.0/lists'

app.use(express.urlencoded({ extended:true }));
app.use(express.static("."))

app.post('/failure', (req, res) => {
    res.redirect('/');
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"signup.html"));
})

app.post('/', (req, res) => {
    const {fname, lname, email} = req.body;
    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ],
    }
    var json_data = JSON.stringify(data);
    // https://nodejs.org/docs/latest/api/http.html#httprequestoptions-callback
    const options = {
        method: 'POST',
        auth: `anystring:${API_KEY}`
    }

    const request =  https.request(`${url}/fce6b22253`,options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(path.join(__dirname,"success.html"));
        } else {
            res.sendFile(path.join(__dirname,"failure.html"));
        }
        let data ='';
        response.on('data', (chunk) => {
            data+=chunk
        });
        response.on('end', () => {
            console.log(JSON.parse(data));
        });
    });

    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      
      // Write data to request body
    // request.write(json_data);
    request.end();


});


app.listen(3000, () => {
    console.log('listening on port 3000');
})
