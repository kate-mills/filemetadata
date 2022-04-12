var express = require('express')
var cors = require('cors')

var fileUpload = require('express-fileupload')
var bodyParser = require('body-parser')

require('dotenv').config()

var app = express()

app.use(cors())

app.use('/public', express.static(process.cwd() + '/public'))

//enable `files` uploads
app.use(fileUpload({ createParentPath: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/fileanalyse', async (req, res) => {
  try {
    if (!req.files) {
      res.send({ status: false, message: 'No file uploaded' })
    } else {
      let { upfile: { name, mimetype: type, size } } = req.files
      res.status(200).send({ name, type, size })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
