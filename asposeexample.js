const wordsApi = new word.WordsApi(clientId, secret);
const fileName = "demo.pdf";
const format = "docx";
const destName = "test.docx";

// upload source document
const uploadRequest = new word.UploadFileRequest();
uploadRequest.path = fileName;
uploadRequest.fileContent = fs.createReadStream(fileName);
console.log(uploadRequest.path)
// Calling API for upload function
wordsApi.uploadFile(uploadRequest)
.then((result) =>
{
    // creating request
    const request = new word.SaveAsRequest();
    request.name = fileName;
    request.saveOptionsData = new word.SaveOptionsData(
    {
saveFormat: format,
fileName: destName
    });
    // Calling API function
    wordsApi.saveAs(request)
    .then((result2) =>
    {
        //console.log("Response: " + JSON.stringify(result2));
        console.log(result2.body)
    });
});


