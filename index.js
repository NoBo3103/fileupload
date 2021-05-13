const express = require('express');
const bodyParser=require("body-parser");

const app = express();
const path = require('path')

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

//Template Engine
//app.set('views',path.join(__dirname, '/views'));
//app.set('view engine' , 'ejs')
const fs = require("fs");

// creating API instance
const clientId = "4f41ff6e-ffcc-4a94-8b9e-304d2dc7a631";
const secret = "ce980b7466f1e4f6623b66b2273bfd95";
const wordsApi = new WordsApi(clientId, secret);
const fileName = "demo.pdf";
const format = "docx";
const destName = "Out_test_multi_pages.docx";

// upload source document
const uploadRequest = new UploadFileRequest();
uploadRequest.path = fileName;
uploadRequest.fileContent = fs.createReadStream(fileName);

// Calling API for upload function
wordsApi.uploadFile(uploadRequest)
.then((result) =>
{
    // creating request
    const request = new SaveAsRequest();
    request.name = fileName;
    request.saveOptionsData = new SaveOptionsData(
    {
saveFormat: format,
fileName: destName
    });
    // Calling API function
    wordsApi.saveAs(request)
    .then((result2) =>
    {
        console.log("Response: " + JSON.stringify(result2));
    });
},


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/upload.html");
    const { WordsApi, SaveOptionsData } = require("asposewordscloud");
const { UploadFileRequest, SaveAsRequest }= require("asposewordscloud/dist/model/model");
var fs = require('fs');

//# Please get your App Key and App SID from https://dashboard.aspose.cloud
wordsApi = new WordsApi("4f41ff6e-ffcc-4a94-8b9e-304d2dc7a631", "ce980b7466f1e4f6623b66b2273bfd95");

const remotename = "02_pages.pdf";
const remoteTempFolder = "Temp";

const request = new SaveAsRequest({
                        saveOptionsData: new SaveOptionsData({
                            saveFormat: "docx",
                            fileName: "TestPostDocumentSavePdfAsDocx.docx",
                        }),

                    });
                    request.name = remotename;
                    request.folder = remoteTempFolder;

wordsApi.saveAs(request).then((result) => {    
    console.log(result.body);    
}).catch(function(err) {
    // Deal with an error
    console.log(err);
});
  }));



app.get("/about",function(req,res){
    res.send("Hi I am Sounav Saha.<br> I am currently a budding web developer.  ");
});


  
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})