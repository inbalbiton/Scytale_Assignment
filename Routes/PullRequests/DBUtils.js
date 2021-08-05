const controller = require("../../DB/Controller");


//This function will return all the unique existing statuse on the server according to which we can filter
async function GetAllStatusDistinct() {
  try {
    let table = await controller.GetTable("PullRequests" , {}, 'PR_Number' , 1);
    let results = [];
    await table.forEach(doc => {
        results.push(doc.Status);
    });
    return results.filter((item, i, ar) => ar.indexOf(item) === i);
  } catch (error) {
    next(error);
  }
}

//This function will return all the unique existing Labels on the server according to which we can filter
async function GetAllLabelsDistinct() {
    try {
        let table = await controller.GetTable("PullRequests" , {}, 'PR_Number' , 1);
        let results = [];
        await table.forEach(doc => {
            results.push(doc.Labels);
        });
        return results.filter((item, i, ar) => ar.indexOf(item) === i);
    } catch (error) {
        next(error);
    }
}

//This function will return all the appropriate Pull Requests for the parameters that the user entered in order to filter and sort
async function GetAllPullRequests(filters, sorted, order) {
    try {
        let table;
        if(filters.length > 0){
            console.log("inside");
            table = await controller.GetTable("PullRequests" , {$and:filters}, sorted, order);
        }
        else{
            table = await controller.GetTable("PullRequests" , {}, sorted, order);
        }
        let results = [];
        await table.forEach(doc => {
            results.push(doc);
        });
        return results;
    } catch (error) {
        next(error);
    }
}
// This function gets a new object that represents a new request and add it to the database
async function AddNewPullRequest(newPR){
    try {
        const res = await controller.InsertObject("PullRequests" , newPR);
        return res;
    } catch (error) {
        next(error);
    }
}
// This function returns the next PR_Number based on the maximum PR_Number that exists in the database, so that it is possible to enter a new request with a unique PR_Number
async function NextPrNumber(){
    try {
        let nextPr = await controller.MaxID("PullRequests");
        return nextPr + 1;
    } catch (error) {
        next(error);
    }
}

exports.GetAllStatusDistinct = GetAllStatusDistinct; 
exports.GetAllLabelsDistinct = GetAllLabelsDistinct; 
exports.GetAllPullRequests = GetAllPullRequests; 
exports.AddNewPullRequest = AddNewPullRequest; 
exports.NextPrNumber = NextPrNumber; 