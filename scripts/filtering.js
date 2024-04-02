const dataCONT=require('../jsonFiles/filteredContributors.json')
const dataCOMM=require('../jsonFiles/commitsFinal.json')
const dataPR=require('../jsonFiles/PRFinal.json')
const dataISS=require('../jsonFiles/issuesFinal.json')
const data=require('../jsonFiles/contributorsFinal.json')
const dataNEWCOMM=require('../jsonFiles/DetailedCommitDataContributors.json')
const dataNON_MERGE_NEWCOMM=require('../jsonFiles/simpleCommitDetailfilteredContributors.json')
const shortDataFinal=require('../jsonFiles/shortFilteredContributors.json')
const relevantCommData=require('../jsonFiles/RelevantCommit.json')
const fileWiseCommitData=require('../jsonFiles/fileWiseCommitData.json')
const AllFileNames=require('../jsonFiles/AllFileNames.json')
const AllExtensionNames=require('../jsonFiles/AllExtensionNames.json')
const RelCodeBasedCommits=require('../jsonFiles/RelCodeBasedCommits.json')
const fs=require('fs')

const axios = require('axios'); 

//Extensions to be ignored-->

function checkSub(inp){
    const Extensions_to_be_ignored = [
        ".bazel","LICENSE",".toml",".json",".yaml",".yml",".cfg",".class",".conf",".ini",".config","gitignore","dockerignore",".rc",".nvmrc",".template",".fstab",".prettierignore",".lock",".o",".pyc",".dll","log",".mfotl",".md",".bak",".swp",".png",".jpg",".gif",".svg",".did"
    ];
    let res=false
    Extensions_to_be_ignored.map((ext)=>{
        if(inp.includes(ext)){
            res=true
        }
    })
    return res
}

//const token = "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";
const token='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';
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
const bodyParameters = {
    key: "value"
};
const pageLength = 100;
const owner = "dfinity";
const repo = "ic";

//FILTERING USABLE ATTRIBUTES FROM ARRAY OF CONTRIBUTERS
// let arr=[]
// data.map((d)=>{
//     arr.push({login:d.login,id:d.id,totalContributions:d.contributions,github:d.html_url})
// })
// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//COMMITS-->
// let arr=[]
// dataCONT.map((d)=>{
//     let commits=[]
//     let cids=[]
//     dataCOMM.map((c)=>{
//         //console.log(dataCOMM[0].author.login)
//         if(c.author?.login===d.login){

//             //console.log(c.commit?.author?.name)
//             commits.push({id:c.sha,email:c.commit?.author?.email})
//             cids.push({id:c.sha,date:c.commit?.author?.date,message:c.commit?.message})
//         }
//        // commits.push(c)
//     })
//     //console.log(commits[0]?.name)
    
//     arr.push({...d,commits:cids,email:commits[0]?.email,commit_count:cids.length})
//     //console.log(commits[0])
// })

// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//PRS
// let arr=[]
// dataCONT.map((d)=>{
//     let prs=[]
//     dataPR.map((pr)=>{

//         const startDate=new Date("August 1, 2023 00:00:00")
//         console.log(pr?.user?.login)
//         if(((new Date(pr?.created_at)>startDate)||(new Date(pr?.closed_at)>startDate))&&(pr?.user?.login===d.login)){
//             prs.push({id:pr?.id,number:pr?.number,title:pr?.title,created_at:pr?.created_at,closed_at:pr?.closed_at})
//         }

//     })
//     arr.push({...d,pullRequests:prs,pr_count:prs.length})
// })

// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//ISSUES-->

// let arr=[]
// dataCONT.map((d)=>{
//     issues=[]
//     dataISS.map((iss)=>{
//         const startDate=new Date("August 1, 2023 00:00:00")
//         if(((new Date(iss?.created_at)>startDate)||(new Date(iss?.closed_at)>startDate))&&(iss?.user?.login===d.login)){
//             issues.push({id:iss?.id,number:iss?.number,title:iss?.title,created_at:iss?.created_at,closed_at:iss?.closed_at})
//         }

//     })
//     arr.push({...d,IssuesRaised:issues,issue_count:issues.length})
// })

// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//SHORTENING-->

//  arr=[]

// dataCONT.map((d)=>{
//     arr.push({
//         id:d.id,
//         login:d.login,
//         email:d.email,
//         all_Time_Contributions:d.totalContributions,
//         github_acc:d.github,
//         total_commits:d.commit_count,
//         non_merge_commits:d.commit_count-d.merges,
//         pull_Request:d.pr_count,
//         issue_Raised:d.issue_count,
//         merges:d.merges,
//         fixes:d.fixes,
//         feats:d.feats,
//         chores:d.chores,
//         tests:d.tests,
//         total_files_affected:d.files_Affected,
//         lines_added:d.line_additions,
//         lines_deleted:d.line_deletions,
//         lines_effected:d.lines_effected_total,
//         relevant_additions:d.rel_comm_add,
//         relevant_deletions:d.rel_comm_del,
//         relevant_commits:d.rel_comm_total
        
//     })
// })

// var file = fs.createWriteStream('shortFilteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();
// console.log(shortDataFinal.length)


//fix,merge, chore count-->
// arr=[]

// dataCONT.map((d)=>{
//     test_count=0
//     d.non_merge_commits.map((commit)=>{
//         if((commit?.message.includes("test")||commit?.message.includes("Test")||commit?.message.includes("test("))){
//             test_count+=1
//         }
//     })
//     arr.push({...d,tests:test_count})
// })


// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//separating commits from merges-->

// let arr=[]

// dataCONT.map((d)=>{
//     Ncommits=[]
//     d.commits.map((commit)=>{
//         if(!(commit?.message.includes("Merge"))){
//             console.log(commit)
            
//             Ncommits.push(commit)
//         }
//     })

//     arr.push({...d,non_merge_commits:Ncommits})
// })
// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//detailed commits fetching-->

// let arr = [];
// let detailed_commits = [{ login: dataCONT[145].login }];

// async function getData() {
//   const commitPromises = dataCONT[145].commits.map(async (commit) => {
//     const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits/${commit.id}`, config);
//     return res.data;
//   });

//   // Wait for all promises to resolve
//   const commitsData = await Promise.all(commitPromises);

//   // Concatenate the first element (login) with the rest of the commits
//   detailed_commits = detailed_commits.concat(commitsData);
// }

// async function writeFile() {
//   try {
//     await getData();
//     arr = [ ...dataNEWCOMM,detailed_commits];

//     // Use fs.promises.writeFile for simplicity
//     //await fs.promises.writeFile('DetailedCommitDataContributors.json', JSON.stringify(arr, null, 2));
//     console.log('File written successfully : '+dataNEWCOMM.length);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// writeFile();

//deleted merges from detailed commits-->
// let arr=[]
//console.log(dataNON_MERGE_NEWCOMM[0].length)

// //console.log(dataNEWCOMM[0][1].stats)

// dataNEWCOMM.map((d)=>{
//     let newCommits=[d[0]]
//     for(let i=1;i<d.length-1;i++){
//         if(!d[i].commit.message.includes("Merge")){
//             newCommits.push(d[i])
//         }
//     }
//     arr.push(newCommits)

// })


// var file = fs.createWriteStream('simpleCommitDetailfilteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();


//sorting total commits based on lines-->

// let arr=[]

// for(let i=0;i<dataNON_MERGE_NEWCOMM.length;i++){
//     let add=0
//     let rem=0
//     for(let j=1;j<dataNON_MERGE_NEWCOMM[i].length;j++){
//         add+=dataNON_MERGE_NEWCOMM[i][j].stats.additions
//         rem+=dataNON_MERGE_NEWCOMM[i][j].stats.deletions
//     }
//     console.log(dataCONT[i].login,i)
//     arr.push({...dataCONT[i],line_additions:add,line_deletions:rem,lines_effected_total:add+rem})
// }


// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();
// console.log(arr.length)
//console.log(dataNON_MERGE_NEWCOMM.length)

//RELEVANT COMMENTS-->

// arr=[]

// dataNON_MERGE_NEWCOMM.map((d)=>{
//     //dataNON_MERGE_NEWCOMM[0].login
//     commit_analysis={}
//     addComm=0
//     remComm=0
//     totalComm=0
//     for(let i=1;i<d.length-1;i++){
//         if(d[i].stats?.additions>=10){
//             addComm+=1
//         }
//         if(d[i].stats?.deletions>=10){
//             remComm+=1
//         }
//         if(d[i].stats?.total>=10){
//             totalComm+=1
//         }
//         //console.log(d.stats)
//     }
//     commit_analysis={login:d[0].login,rel_comm_add:addComm,rel_comm_del:remComm,rel_comm_total:totalComm}
//     arr.push(commit_analysis)
    
// })

// var file = fs.createWriteStream('RelevantCommit.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//RELEVANT DATA ADDED TO MAIN FILTERED CONTRIBUTORS

// arr=[]

// for(let i=0;i<dataCONT.length;i++){

//     let data1={...dataCONT[i],
//         rel_comm_add:relevantCommData[i].rel_comm_add,
//         rel_comm_del:relevantCommData[i].rel_comm_del,
//         rel_comm_total:relevantCommData[i].rel_comm_total
//     }
//     arr.push(data1)
// }


// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//Getting all the file names with their users-->

// let arr=[]

// for(let i=0;i<dataNON_MERGE_NEWCOMM.length;i++){
//     let filesChanged=[{login:dataNON_MERGE_NEWCOMM[i][0].login}]
//     for(let j=1;j<dataNON_MERGE_NEWCOMM[i].length;j++){
//         for(let k=0;k<dataNON_MERGE_NEWCOMM[i][j].files.length;k++){
//             console.log(dataNON_MERGE_NEWCOMM[i][j].files[k].filename)
//             filesChanged.push({
//                 filename:dataNON_MERGE_NEWCOMM[i][j].files[k].filename,
//                 add:dataNON_MERGE_NEWCOMM[i][j].files[k].additions,
//                 del:dataNON_MERGE_NEWCOMM[i][j].files[k].deletions,
//                 total:dataNON_MERGE_NEWCOMM[i][j].files[k].changes
//             })
//         }
//     }
//     arr.push(filesChanged)
// }

// var file = fs.createWriteStream('fileWiseCommitData.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//Getting all filenames-->

// let arr=[]

// for(let i=0;i<fileWiseCommitData.length;i++){
//     for(let j=1;j<fileWiseCommitData[i].length;j++){
//         arr.push(fileWiseCommitData[i][j].filename)
//     }
// }


// var file = fs.createWriteStream('AllFileNames.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//getting all extension names-->
// let arr=[]

// for(let i=0;i<AllFileNames.length;i++){
//     tmpArr=AllFileNames[i].split(".")
//     arr.push(tmpArr[tmpArr.length-1])
// }

// var file = fs.createWriteStream('AllExtensionNames.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();
//GETTING UNIQUE EXTENSIONS-->
// let set=new Set(AllExtensionNames)
// let arr=[...set]

// var file = fs.createWriteStream('UniqueExtensionNames.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//relevant line chages added

// arr=[]

// for(let i=0;i<fileWiseCommitData.length;i++){
//     let login=fileWiseCommitData[i][0].login
//     let filesChanged=0
//     let rel_additions=0
//     let rel_deletions=0
//     let rel_commits=0
//     for(let j=1;j<fileWiseCommitData[i].length;j++){
//         if(!checkSub(fileWiseCommitData[i][j].filename)){
//             filesChanged+=1
//             rel_additions+=fileWiseCommitData[i][j].add
//             rel_deletions+=fileWiseCommitData[i][j].del
//             rel_commits+=fileWiseCommitData[i][j].total
//         }
//     }
//     arr.push({login:login,total_files_effected:filesChanged,line_additions:rel_additions,line_deletions:rel_deletions,line_changes:rel_commits})
// }


// var file = fs.createWriteStream('RelCodeBasedCommits.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();
//line updates updated to filteredContributors.json
// arr=[]

// for(let i=0;i<RelCodeBasedCommits.length;i++){
//     let data={
//         ...dataCONT[i],
//         line_additions:RelCodeBasedCommits[i].line_additions,
//         line_deletions:RelCodeBasedCommits[i].line_deletions,
//         lines_effected_total:RelCodeBasedCommits[i].line_changes,
//         files_Affected:RelCodeBasedCommits[i].total_files_effected
//     }
//     arr.push(data)
    
// }


// var file = fs.createWriteStream('filteredContributors.json');
// file.on('error', function (err) { /* error handling */ });
// file.write(JSON.stringify(arr, null, 2));
// file.end();

//Score calculation
arr=[]
shortDataFinal.map((sd)=>{
    let res=
    (sd.non_merge_commits*0.1)+
    (sd.merges*0.11)+
    (sd.fixes*0.15)+
    (sd.feats*0.15)+
    (sd.chores*0.11)+
    (sd.tests*0.13)+
    (sd.total_files_affected*0.08)+
    (sd.lines_added*0.06)+
    (sd.lines_deleted*0.025)+
    (sd.relevant_additions*0.06)+
    (sd.relevant_deletions*0.025)
    arr.push({score:res.toFixed(2)})
})
console.log(arr.length)

var file = fs.createWriteStream('finalScores.json');
file.on('error', function (err) { /* error handling */ });
file.write(JSON.stringify(arr, null, 2));
file.end();