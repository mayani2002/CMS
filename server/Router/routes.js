import Express from "express";
import { addUserInfo, getUserInfo, addquery, getAllUserInfo, getAllQuery, changeStatus} from "../controllers/user-controller.js";

const route = Express.Router();


// defining add API and call addUser() function on post request sent

//USER API
route.post('/addUserInfo', addUserInfo); //signup
route.get('/getUserInfo', getUserInfo);  //login
// route.put('/users', putUsersInfo);  //edit account info      (optional)

route.post('/addquery', addquery); //add query
route.get('/getquery', getquery); //get pick up  request to be scheduled
// route.put('/putQuery', putQuery); //add pick up  request to be scheduled                (optional)
// route.delete('/deleteQuery', deleteQuery); //delete request                            (optional)

// route.get('/getNotifications', getNotifications);  //access notifications               (optional)


//--------------------------------------------------------------------
//ADMIN API
route.get('/getAllUserInfo', getAllUserInfo); //get all the user details

route.get('/getAllQuery', getAllQuery);  //get all the Queries

route.put('/changeStatus', changeStatus);  //take action ( changing the status from in-process to action taken)


//--------------------------------------------------------------------
// Common API




export default route;