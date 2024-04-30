const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://samyukthaxsam:Mango!@futurewebsite.y0r7ldf.mongodb.net/?retryWrites=true&w=majority&appName=FutureWebsite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
}).catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});

// Define a schema for your data
const ResponseSchema = new mongoose.Schema({
    response: String
});

// Create a model based on the schema
const Response = mongoose.model('Response', ResponseSchema);

// Routes
app.post('/responses', async (req, res) => {
    const newResponse = new Response({
        response: req.body.response
    });

    try {
        const savedResponse = await newResponse.save();
        res.status(201).send(savedResponse);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/responses', async (req, res) => {
    try {
        const responses = await Response.find();
        res.status(200).send(responses);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
