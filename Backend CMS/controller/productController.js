const connection = require("../connection");

const addProduct = (req,res) => {
    let product = req.body;
    query = "insert into product (name, categoryId, description, price, status) values(?,?,?,?,'true')";
    connection.query(query,[product.name,product.categoryId,product.description,product.price],(err,results)=>{
        if(!err){
            return res.status(200).json({message: "Product added successfully"});
        } else{
            return res.status(500).json(err);
        }
    })
}

const getProduct = (req,res,next) => {
    query = "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        } else{
            return res.status(500).json(err);
        }
    })
}

const getByCategory = (req,res,next) => {
    const id = req.params.id;
    query = "select id,name from product where categoryId=? and status ='true'";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        } else{
            return res.status(500).json(err);
        }
    })
}

const getById = (req,res,next) => {
    const id = req.params.id;
    query = "select id,name,description,price from product where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results[0]);
        } else{
            return res.status(500).json(err);
        }
    })
}

const update = (req,res,next) => {
    let product=req.body;
    var query = "update product set name=?, categoryId=?, description=?,price=? where id=?"
    connection.query(query,[product.name, product.categoryId, product.description, product.price, product.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Product id does not exist"});
            }
            return res.status(200).json({message: "Product updated successfully"});
        } else{
            return res.status(500).json(err);
        }
    })
}

const deleteById = (req,res,next) => {
    const id = req.params.id;
    query = "delete from product where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Product id does not exist"});
            }
            return res.status(200).json({message: "Product deleted successfully"});
        } else{
            return res.status(500).json(err);
        }
    })
}

module.exports = { addProduct, getProduct, getByCategory, getById, update, deleteById }