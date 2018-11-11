const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');

const ServerReportRouter = require('./routes/ServerReportRouter');

// Set up mongoose connection
let dev_db_url = 'mongodb://Admin:admin123@ds125453.mlab.com:25453/pothole-qro';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/serverreport', ServerReportRouter);

//Serve static assets if in production 
// if(process.env.NODE_ENV === 'production'){
//   //Set static folder
//   app.use(express.static('build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'in'))
//   })
// } 

app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});