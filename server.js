const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const apiUri = `${process.env.API_PATH}/api/ResponsivePages`;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get all pages endpoint

app.get('/api/pages', (req, res, next) => {
    let url = `${apiUri}`;
    fetch(url).then(res => res.json())
        .then(data => res.send([ ...data ]));
});

// get page endpoint
// params: id

app.get('/api/pages/:id', (req, res, next) => {
    let pageID = req.params.id;
    let url = `${apiUri}/${pageID}`;

    fetch(url).then(res => res.json())
        .then(data => res.send( data ));
})

// update page endpoint
// params: id | query: id, title, Description, type, isActive, publishedOn

app.put('/api/pages/:id', (req, res, next) => {
    let pageIDParam = req.params.id;
    let url = `${apiUri}/${pageIDParam}`;

    const putRequestObject = req.body;
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(putRequestObject)
    };

    fetch(url, options)
    .then(response => {
        if(response.status == 200) {
            res.status(200).send();
        }else {
            res.status(response.status).send("error!!");
        }
    });    
});

// create page endpoint
// guery: id, title, description, type, isActive, publishedOn

app.post('/api/pages', (req, res, next) => {
    let url = 'https://pagesmanagement.azurewebsites.net/api/responsivepages';

    const postObject = {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        isActive: req.body.isActive,
        publishedOn: req.body.publishedOn
    }

    const postRequest = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postObject)
    }

    fetch(url, postRequest).then((response) => {
        response.status != 201? res.status(response.status).send() : response.json();
    })
    .then(data => {
        res.status(201).send(); 
    });

});


// delete page endpoint
// params: id 

app.delete('/api/pages/:id', (req, res, next) => {
    let pageIDParam = req.params.id;
    console.log(pageIDParam);
    let url = `${apiUri}/${pageIDParam}`;

    fetch(url, { method: 'DELETE' }).
    then(response => {
        response.status == 200? res.status(200).send() : res.status(response.status).send();
    });

})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})