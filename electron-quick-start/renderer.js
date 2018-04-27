// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const filePath = 'd:/Abschlussprojekt/download.dnl';


window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('fileToRead');
        fileSelected.addEventListener('change', function (e) {
            var fileTobeRead = fileSelected.files[0];
            console.log(fileTobeRead);
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                // var fileContents = document.getElementById('filecontents');
                // fileContents.innerText = fileReader.result;
                const file = event.target.result;
                const allLines = file.split(/\r\n|\n/);
                // Reading line by line
                allLines.map((line) => {
                    let first4 = line.substring(0, 4);
                    if (first4 == '0100') {
                        console.log(line);
                    }
                });
            }
            fileReader.readAsText(fileTobeRead);
        }, false);
    }
    else {
        alert("Files are not supported");
    }
}

