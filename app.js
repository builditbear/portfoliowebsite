const express = require('express');
const app = express();
const path = require('path');


app.listen(3000, function() {
    console.log("Server listening on port 3000.");
});

app.use('/', express.static(__dirname));