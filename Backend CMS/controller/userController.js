const connection = require("../connection");
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

const postSignUp = (req, res)=>{
    let user = req.body;
    query = "select email, password, role, status from user where email=?"
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <= 0){
                query = "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query,[user.name,user.contactNumber,user.email,user.password],(err, results) => {
                    if(!err){
                        return res.status(200).json({message: "Successfully created"});
                    }
                    return res.status(500).json(err);
                })
            } else{
                return res.status(400).json({message: "Email already exists"});
            }
        }else{
            return res.status(500).json(err);
        }
    })   
}

const postLogin = (req, res) => {
    let user = req.body;
    query = "select email, password, role, status from user where email=?"
    connection.query(query,[user.email],(err, results)=>{
        if(!err){
            if(results.length <= 0 || results[0].password != user.password){
                return res.status(401).json({message: "Incorrect Username or password"})
            } else if(results[0].status === 'false'){
                return res.status(401).json({message: "Wait for admin approval"})
            } else if(results[0].password == user.password){
                const response = { email: results[0].email, role: results[0].role}
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN,{expiresIn:'8h'})
                res.status(200).json({token:accessToken})
            } else{
                return res.status(400).json({message: "Something went wrong. Please try again alter"})
            }
        } else{
            return res.status(500).json(err);
        }
    })
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const resetPassword = (req, res) => {
    const user = req.body;
    query = "select email, password from user where email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length<=0){
                return res.status(200).json({message:"Password sent  successfully to your email."});
            } else{
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: "Password by Cafe Management System",
                    html: '<p><b>Your Login Details for CMS</b><br>Email:'+results[0].email+'<br>Password:'+results[0].password+'</p>'
                };
                transporter.sendMail(mailOptions,function(error,info){
                    if(error){
                        console.log(error);
                    } else{
                        console.log('Email sent: '+info.response);
                    }
                    return res.status(200).json({message:"Password sent  successfully to your email."});
                })
            }
        } else{
            return res.status(500).json(err);
        }
    })
}

const getDetails = (req, res) => {
    var query = "select id,name,email,contactNumber,status from user where role='user'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        } else{
            return res.status(500).json(err);
        }
    })
}

const updateDetails = (req, res) => {
    let user=req.body;
    query = "update user set status=? where id=?";
    connection.query(query,[user.status, user.id], (err, results)=>{
        if(!err){
            if(results.length <= 0 || results.affectedRows == 0){
                return res.status(404).json({message: "User ID does not exist"})
            } 
            return res.status(200).json({message: "User updated successfully"})
        } else{
            return res.status(500).json(err);
        }
    })
}

const checkToken = (req,res) => {
    return res.status(200).json({message: "True"});
}

const changePassword = (req,res) => {
    const user = req.body;
    const email = res.locals.email;
    var query = "select * from user where email=? and password=?"
    connection.query(query,[email,user.oldPassword],(err,results)=>{
        if(!err){
            if(results.length <=0){
                return res.status(400).json({message: "Incorrect Old Password"});
            } else if(results[0].password == user.oldPassword){
                query = "update user set password=? where email=?";
                connection.query(query,[user.newPassword,email],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message: "Password Updated Successfully"})
                    } else{
                        return res.status(500).json(err);
                    }
                })
            } else{
                return res.status(400).json({message: "Something went wrong, please try again later"})
            }
        } else{
            return res.status(500).json(err);
        }
    })
}

module.exports = {postSignUp, getDetails, updateDetails, checkToken, postLogin, resetPassword, changePassword}