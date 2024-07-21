const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website'));

// Initialize the main project data object
let projectData = {};

// Setup Server
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on localhost: ${port}`);
});

// GET route to return project data
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route to add data
app.post('/add', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    };
    res.send(projectData);
});
