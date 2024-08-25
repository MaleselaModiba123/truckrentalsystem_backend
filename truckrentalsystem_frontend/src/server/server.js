const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configure body-parser for larger payloads
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Your routes and other configurations here
