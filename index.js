const express = require('express');
const path = require('path');
const fs = require('fs');
var zip = require('express-zip');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var multer = require('multer')
const {v4: uuidv4} = require('uuid');
var cors = require('cors');
const connectDB = require('./config/db');
const JobPosting = require('./models/JobPosting');
const mongoose = require('mongoose');

dotenv.config({path: './config/config.env'});
connectDB();

let appID;

const app = express();

app.use(cors());

const directoryPath = path.join(__dirname, 'uploads');

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, appID + '_' + newFilename);
        //post the name onto MongoDB
    }
})
var upload = multer({ storage: storage }).single('file')

//Create a search function which brings results.
app.post('/api/results', (req,res) => {
    let search = req.body.location;
    JobPosting.find({ "position": { "$regex": search, "$options": "i" } })
        .then(posts => {
            res.send(posts);
        })
        .catch(err => {
            console.log(err);
        });
});

//Create a get function to get a job application.
app.post('/api/postings', (req,res) => {
    let postingID = req.body.location;
    JobPosting.findOne({ "_id": postingID})
        .then(posting => {
            res.send(posting);
        })
        .catch(err => {
            console.log(err);
        });
});

//Create a set function to send in the resume to the employers email
app.post('/api/upload', (req,res) => {
    console.log(req.query.id);
    appID = req.query.id;
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});

//Create a set function to post jobs
app.post('/api/emp_postings', (req,res) => {
    let { email, position, company, pay, description } = req.body;
    let myId = mongoose.Types.ObjectId();

    const newJob = new JobPosting({
        _id: myId,
        email,
        position,
        company,
        pay,
        description
    });
    newJob.save()
    .then( (i) =>{
        res.send(myId);
    })
    .catch(err => console.log(err));
});

//grab the resumes
app.post('/api/resumes', (req,res) => {
    let id = req.body.location;
    let fileArray = [];
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        let i = 1;
        files.forEach(function (file) {
            if(file.includes(id)){
                let details = {path: ("uploads/").concat(file), name: 'resume'.concat(i)}
                i++;
                fileArray.push(details);
            }
        })
        res.zip(fileArray);
    });
});



app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);