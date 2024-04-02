const fs = require('fs');
const axios = require('axios');

const token = "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";
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const bodyParameters = {
    key: "value"
};
const pageLength = 100;
const owner = "dfinity";
const repo = "ic";
let arr = [];
var file = fs.createWriteStream('../jsonFiles/PRFinal.json');

const fetchComments = async () => {
    let currPage = 1;
    let itr = true;
    let data = [];
    
    do {
        
        await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?per_page=${pageLength}&page=${currPage}`, config)
            .then((res) => {
                data = res.data;
            })
            .catch((err) => {
                console.error(err);
            });

        if (data.length < pageLength) {
            itr = false;
        }
        if(currPage>60){
            itr=false
        }
        console.log(data)

        data.forEach((d) => {
            arr.push(d);
        });

        currPage++;
    } while (itr);
};

const setArr = async () => {
    await fetchComments().then(() => {
        file.on('error', function (err) { /* error handling */ });
        file.write(JSON.stringify(arr, null, 2));
        file.end();
    });
};

setArr();
