const connection = require("../connection");

const addCategory = (req,res) => {
    let category = req.body;
    query = 'insert into category (name) values(?)';
    connection.query(query,[category.name],(err,results)=>{
        if(!err){
            return res.status(200).json({message: "Category added successfully"})
        } else{
            return res.status(500).json(err);
        }
    })
}

const getCategory = (req, res, next) => {
    query = 'select * from category order by name';
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        } else{
            return res.status(500).json(err);
        }
    })
}

const updateCategory = (req, res, next) => {
    let product = req.body;
    query = 'update category set name=? where id=?';
    connection.query(query,[product.name, product.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message: "Category id not found"});
            } else{
                return res.status(200).json({message: "Category updated"});
            }
        } else{
            return res.status(500).json(err);
        }
    })
}

module.exports = { addCategory, getCategory, updateCategory}