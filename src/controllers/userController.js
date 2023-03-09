const { allPendingUsers,deletePendingRequest,acceptPendingRequest,addChild,updateUser,getSingleUser,changePassword } = require('../utils/userUtils')

async function getAllPendingUsers(req,res)
{
    let result=await allPendingUsers(req.body)
    res.send(result)
}

async function justDeletePendingRequest(req,res){
    let result = await deletePendingRequest(req.body)
    res.send(result)
}

async function justAcceptPendingRequest(req,res){
    let result = await acceptPendingRequest(req.body)
    res.send(result)
}

async function justAddChild(req,res)
{
    let result = await addChild(req)
    res.send(result)
}

async function justUpdateUser(req,res)
{
    let result = await updateUser(req)
    res.send(result)
}

async function justGetSingleUser(req,res)
{
    let result = await getSingleUser(req.body)
    res.send(result)
}

async function justChangePassword(req,res)
{
    let result = await changePassword(req.body)
    res.send(result)
}
module.exports = { getAllPendingUsers,justDeletePendingRequest,justAcceptPendingRequest,justAddChild,justUpdateUser,justGetSingleUser,justChangePassword}