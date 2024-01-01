import express from 'express';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.urlencoded({ extended: true}));

// OWN_Endpoint = 'https://api.openweathermap.org/data/2.5/weather'
// api_key = 'e575bc0656bec888f9267c7dd8cf1be5'

// params = {
    //     'lat':51.500149,
    //     'lon':-0.126240,
    //     'appid':api_key
    // }
function getWeather(location, callback){
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e575bc0656bec888f9267c7dd8cf1be5`
            
    https.get(endpoint,(res) => {
        res.on('data', (data) => {
            console.log(data)
            try {
                let data_json = JSON.parse(data);
                callback(data_json)
            } catch (error) {
                callback(null,error)
            }
            
        });
    })
}


app.get('/', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/', (req, res) => {
    const location = req.body.local

    getWeather(location, (weather, error) => {
        if(!error) {
            const temp = weather.main.temp;
            const description = weather.weather[0].description;
            const icon = weather.weather[0].icon;

            res.write(`<h1>temp: ${temp}</h1>`)
            res.write(`cloud: ${description}`)
            res.write(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`)
            res.send();
        }
    })
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})