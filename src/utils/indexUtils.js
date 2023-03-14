const { postModel } = require("../models/postModel");
const { friendsModel } = require("../models/friendsModel");
const mongoose = require('mongoose')

async function fetchMyPosts(email){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let posts = await postModel.find({ userEmail: email, status: "accepted"});
        if(posts.length != 0){
            result.success = true;
            result.message = "Fetched posts";
            result.data = posts;
        }
        else{
            result.message = "No posts till now";
        }
    }
    catch(e){
        result.message = "Failed to fetch posts";
    }
    return result;
}



async function addUserToLikedArray(email,postid){
    //postid is object id
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let updateResult = await postModel.updateOne({_id:new mongoose.Types.ObjectId(postid)},{$push:{likedUsers:email}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "Added user to liked list";
            result.data = "";
        }
        else{
            result.message = "Addeding user to liked list failed";
        }
    }
    catch(e){
        result.message = "failed to add user to liked list";
    }
    return result;
}



async function removeUserFromLikedArray(email,postid){
    //postid is object id
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let updateResult = await postModel.updateOne({_id:new mongoose.Types.ObjectId(postid)},{$pull:{likedUsers:email}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "removed user from liked list";
            result.data = "";
        }
        else{
            result.message = "removing user from liked list failed";
        }
    }
    catch(e){
        result.message = "failed to remove user from liked list";
    }
    return result;
}



async function removeUserFromDislikedArray(email,postid){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let updateResult = await postModel.updateOne({_id:new mongoose.Types.ObjectId(postid)},{$pull:{dislikedUsers:email}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "removed user from dislikedUsers list";
            result.data = "";
        }
        else{
            result.message = "removing user from dislikedUsers list failed";
        }
    }
    catch(e){
        result.message = "failed to remove user from dislikedUsers list";
    }
    return result;
}



async function addUserToDislikedArray(email,postid){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let updateResult = await postModel.updateOne({_id:new mongoose.Types.ObjectId(postid)},{$push:{dislikedUsers:email}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "Added user to dislikedUsers list";
            result.data = "";
        }
        else{
            result.message = "Addeding user to dislikedUsers list failed";
        }
    }
    catch(e){
        result.message = "failed to add user to dislikedUsers list";
    }
    return result;
}




async function fetchPostData(postid){
    //postid is object id
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let fetchResult = await postModel.findOne({_id: new mongoose.Types.ObjectId(postid)});
            result.success = true;
            result.message = "fetched post data";
            result.data = fetchResult;
    }
    catch(e){
        result.message = "fetching post data failed";
    }
    return result;
}



async function addNewComment(commentData){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let newComment = {
            userPic : commentData.userPic,
            userName : commentData.userName,
            commentText : commentData.commentText,
            commentedTime : new Date(),
            userEmail : commentData.userEmail
        }
        let updateResult = await postModel.updateOne({_id:new mongoose.Types.ObjectId(commentData.postId)},{$push:{comments:newComment}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "Added comment to comments list";
            result.data = "";
        }
        else{
            result.message = "Adding comment to comments list failed";
        }
    }
    catch(e){
        result.message = "failed to Add comment to comments list";
    }
    return result;
}


async function fetchMyFeedPosts(email){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{

        let now = new Date();
        let yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        let myEmail = email;
        
        // Find my friends from friends collection
        let myFriends = await friendsModel.find({
        $and: [
            { $or: [{ senderEmail: myEmail }, { receiverEmail: myEmail }] },
            { status: "accept" },
        ],
        },{senderEmail:1, receiverEmail:1});

        let finalUsers = [];
        for(let x in myFriends){
            let friend = myFriends[x];
            if(friend.senderEmail == myEmail){
                finalUsers.push(friend.receiverEmail)
                
            }
            else{
                finalUsers.push(friend.senderEmail)
            }
                
        }



        
        let myFollowers = await friendsModel.find({ senderEmail : myEmail, status: "reject"},{_id:0,receiverEmail : 1});
        for(follower of myFollowers){
            finalUsers.push(follower.receiverEmail)
        }


        // Find my groups from groups collection
        // let myGroups = await groupModel.find({
        // $or: [{ groupOwnerEmail: myEmail }, { senderEmail: myEmail }],
        // status: "accepted",
        // }).distinct("groupName");

        // Find posts from my friends and all posts posted in groupName where groupName is in my groups which are posted in last 24 hours
        let myFriendsPosts = await postModel.find({
            $and: [
              { userEmail: { $in: finalUsers } },
              { postedTime: { $gte: yesterday } },
              { userEmail: { $ne: myEmail } },
              { status : "accepted"}
            ],
          });
          
        //   let myGroupsPosts = await groupPostModel.find({
        //     $and: [
        //       { groupName: { $in: myGroups } },
        //       { postedTime: { $gte: yesterday } },
        //       { senderEmail: { $ne: myEmail } },
        //     ],
        //   });


        //   let finalPosts = {
        //     groupPosts : myGroupsPosts ? myGroupsPosts : [],
        //     friendsPosts : myFriendsPosts ? myFriendsPosts : []
        //   }


        // if(myFriendsPosts.length != 0 || myGroupsPosts.length != 0){
        //     result.success = true;
        //     result.message = "Fetched posts";
        //     result.data = finalPosts;
        // }
        // else{
        //     result.message = "No posts found";
        //     result.data = {
        //         groupPosts : [],
        //         friendsPosts : []
        //     }
        // }
        result.success = true;
        result.data = myFriendsPosts ?  myFriendsPosts.reverse() : []
    }
    catch(e){
        result.message = "Failed to fetch posts";
    }
    return result;
}


async function childrenPendingPosts(obj)
{
    let result = {
        success: false,
        message: "",
        data: []
    }
    try{
        let childArray=[]
        for(x in obj.children)
        {
            let data=await (await fetchMyPosts(obj.children[x])).data
            childArray.push(data[0])
        }
        result.success=true;
        result.message="succesfully got the children pending posts"
        result.data=childArray;
    }
    catch(e){
        result.message = "failed to get the children pending posts";
    }
    return result;
}

async function acceptPendingChildPost(obj)
{
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
<<<<<<< HEAD
=======
        // console.log(obj.email)
>>>>>>> d3f65c96b3b1ee1e782735055f219832def6641b
        let data = await postModel.updateOne({userEmail:obj.email},{$set:{status:"accepted"}})
        result.success=true;
        result.message="succesfully accepted the children pending posts"
    }
    catch(e){
        result.message = "failed to accept the children pending posts";
    }
    return result;
}

async function deletePendingChildPost(obj)
{
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let data = await postModel.deleteOne({userEmail:obj.email})
        result.success=true;
        result.message="succesfully deleted the children pending posts"
    }
    catch(e){
        result.message = "failed to delete the children pending posts";
    }
    return result;
}

async function totalLikesAndPosts(obj)
{
    let result = {
        success: false,
        message: "",
        data: {}
    }
    try{
        let totaldata = await postModel.aggregate([
            {
                $match:{userEmail:obj.email}
            },
            {
                $group:{
                    _id:"$userEmail",
                    postsCount:{$count:{}},
                    likedCount:{
                        $sum:{$size:"$likedUsers"}
                    }
                }
            },
            {
                $project:{
                    _id:0
                }
            }
        ])
        const date=new Date();
            let fromLastWeek = await postModel.aggregate([
            {
                $match:{userEmail:obj.email,postedTime:{$gte:new Date(date.getTime()-(7*24*60*60*1000))}}
            },
            {
                $group:{
                    _id:"$userEmail",
                    postsCount:{$count:{}},
                    likedCount:{
                        $sum:{$size:"$likedUsers"}
                    }
                }
            },
            {
                $project:{
                    _id:0
                }
            }
        ])

        result.data=totaldata[0]
        result.data.fromlastweeklikescount=fromLastWeek[0].likedCount
        result.data.fromlastweekpostscount=fromLastWeek[0].postsCount
        result.success=true;
        result.message="succesfully got the likes and posts count"
    }
    catch(e){
        result.message = "failed to get the likes and posts count";
    }
    return result;
}

module.exports = {fetchMyPosts, addUserToDislikedArray, addUserToLikedArray, removeUserFromDislikedArray, removeUserFromLikedArray, fetchPostData, addNewComment, fetchMyFeedPosts ,childrenPendingPosts ,acceptPendingChildPost ,deletePendingChildPost,totalLikesAndPosts};