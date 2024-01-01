import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({extended:true})); // use text body
app.use(express.json()); // if nedd with json then

// app.get('/', (req, res) => {
//     console.log(__dirname)
//     res.sendFile(path.join(__dirname,"index.html"));
// })


// app.post('/', (req, res) => {
//     res.send('submit successfully')
//     console.log(req.body)
// });

app.get('/bmicalculator', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname,"bmiCalculator.html"));
})

app.post('/bmicalculator', (req, res) => {
    
    const {weight, height} = req.body
    let bmi = parseFloat(weight / (height)**2)

    res.send(`Your BMI is ${bmi}`);
})

app.listen(3000, () => {
    console.log('server listening on port 3000');
})