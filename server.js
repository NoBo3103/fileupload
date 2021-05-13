const express = require('express');
const multer = require('multer');
const path = require('path');
var fs = require('fs');
//const cloudconvert = require('cloudconvert');

//const cloudConvert = new cloudconvert('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2ExMmYwZTYyYTcwY2Y1YmEzMDNjN2ZmYjgzNzdjODhjMTQ1MDU5MDNjZjNhMGM3MjdkZTg1NGQ4NjhlYTU1NTlmOTkwNzYxNWUxMWI1NGIiLCJpYXQiOjE2MjA5MTM1MjUuNDEwMjUsIm5iZiI6MTYyMDkxMzUyNS40MTAyNTQsImV4cCI6NDc3NjU4NzEyNS4zNTg5NzgsInN1YiI6IjUxMDQ1NTM5Iiwic2NvcGVzIjpbInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIiwid2ViaG9vay5yZWFkIiwid2ViaG9vay53cml0ZSIsInByZXNldC5yZWFkIiwicHJlc2V0LndyaXRlIl19.kAh_w9aZ2I5fCkgwvjb_giItxkOK4llRtKvQOyF0R5FPmjQF1Fv_OZfyC3Q5pFTJX7tS2GPgrACd23peef1J0lAwsK-exVrq9yqGE9vSLZ5FofXQ65Byw7lGtJtXb-vpCmB_ZvDHSeYKiq5Z-6KCDhHlkBwusnqSkOgeT9C8xxKIdnXU3E26ez8uLJcs1lIz6BwF21ERWdtmz1lut1AxlzrWdaqQ43TEFsLE8nhxkvsQ8sN42g28Xbz-01lhQDT61Sss9HwpzQA1v4E5x8D82BoYcdwK0rXCbY8ZORA7g5qExLGU0zwSaQyPVTVWyxWYQ-cXIfN3ya0cCnmZSasJx0UaO6kpxA7bM0ZQqHB8iMxkiKON4ye9H3WHWr6am4MiBmdt_5O2Bn1M7yJuTLRI7BLGee2LDhdbZggDQaVlqgUijPBcqBSY6-W19hBIeWlk4oMSFul2PUCTw8PzGPGF7uVYnrGJSJIAsYUnF8WVojUY-NKmf5ui-D9SF4BYrFzh_Lhk5P_TkQ5KAoom7DFVv4Y3dPIEVMrSEpSoFiF8oZtZ6oSOCeMgaY7Wt882-3Dv6xdBQusLwQAzOeMUskBSOJkyB3CPGEzhZHfyt4UzQzoPve6lEoNoYSxzyNngIUWOMb6X0dZQ8qmW2mLs165APqLUCnCURwZpev27ihEsyd0');
const uuid = require('uuid').v4;
const word = require('asposewordscloud');
const request = require('request');
const fetch = require("node-fetch");
//console.log(request)
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
  
    filename: function(req, file, cb) {
        const {originalName} = file;
        cb(null, file.originalname + '-' + path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});

const app = express();
app.use(express.static('public'));

let fileToConvert;
app.post('/upload',upload.single('file'), (req,res) => {
    const { filename: file } = req.file;
    console.log(req.file);
    fileToConvert = req.file.filename
    console.log("type:",typeof(fileToConvert))
    console.log('File needed to be converted : ',String(fileToConvert));
    if(req.file)
    {   console.log('Sent to Converter');
        ConvertV1(fileToConvert);
    }    

    return res.json({status:'OK'});
})



async function ConvertV1 (filename) {  
var cloudconvert = new (require('cloudconvert'))('ILPyn0K5fDC7KFfMRLP3GikoqNkyAsS63GbLPwRbjvrafNKqqL4WaS4ZGdAh3mx7');
         await fs.createReadStream('uploads/' + String(filename))
            .pipe(cloudconvert.convert({
                inputformat: 'pdf',
                outputformat: 'docx',
              
            }))
            .pipe(fs.createWriteStream('converted/'+filename.slice(0,-9)+ '.docx'))
            .on('finish', function() {
                console.log('Done!');
            });



        }





/*
async function Convert(){
let job = await cloudConvert.jobs.create({
    tasks: {
        /*'import-my-file': {
            operation: 'import/url',
            url: 'https://my-url'
        },*/
      /*  'convert-my-file': {
            operation: 'convert',
            input:reader,
            input_format: 'pdf',
            output_format: 'docx',
            filename: "converteddemo"
        },/*,
        'export-my-file': {
            operation: 'export/url',
            input: 'convert-my-file'
        } */
        /*'conversion':{
            operation:'convert',
            input:'convert-my-file',
            input_format: 'pdf',
            output_format: 'docx',
            
        }
    }
}).catch((err)=>{
    console.log(err);
});
//console.log(job);

}
//Convert();

/*
//Aspose SDK
let AccessToken;

// creating API instance
let clientId = "4f41ff6e-ffcc-4a94-8b9e-304d2dc7a631";
let secret = "ce980b7466f1e4f6623b66b2273bfd95";
//Body of the HTTP request. Made as per Documentation on Aspose
let Credentials = {
    'grant_type': 'client_credentials',
    'client_id':'301f2b26-b4f6-4dca-a8e3-f1012fba1f9c',
    'client_secret':secret

}
let file = "demo.pdf" //dummy file in the local system
let format = "docx"   //format to be changed to 

async function ShowData(){
const data =await fetch('https://api.aspose.cloud/connect/token',{
    method:'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'  
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`
    }).then(res => res.json())
        
//    console.log("DATA : ",data); //Should essentially return the Authorization Bearer Token as per doc. 
    //console.log("Access TOKEN  : ", data.access_token);
    AccessToken = String(data.access_token);
    console.log("Bearer " + AccessToken);
    const response =  await fetch(`https://api.aspose.cloud/v4.0/words/convert?format=${format}&fileNameFieldValue=Result`,{
   
        body: "{document:{}}",
    headers:{
        'Accept':'application/octet-stream',
        'Authorization': 'Bearer' + AccessToken,
        "Content-Type": "multipart/form-data",
        "X-Aspose-Client": "Containerize.Swagger"
    },
    method:'PUT'
}).then(res => res.json())
//let result = response.then();
console.log('response : ',response); //Promise Pending //Should give the download link to the file supposedly 


}
   // console.log(JSON.stringify(Credentials))



ShowData(); //Triggering the API call */

//If the token is received calling the API to convert the file 

app.listen(3001,() => console.log('App is listening...'));

