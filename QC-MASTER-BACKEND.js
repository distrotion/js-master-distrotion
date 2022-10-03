const express = require('express')
const app = express()
const cors = require("cors")
const router = express.Router();
const bodyParser = require('body-parser');
const port = 14000


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
limit: '150mb',
extended: true
})); 
// app.use(express.limit('10M'));
app.use(cors())
app.use("/", require("./api"))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

