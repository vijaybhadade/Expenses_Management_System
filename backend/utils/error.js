const throwError=(data)=>{
    if(data===null)
    {
        const error= new Error("Expense not found!");
        error.statusCode=404;
        throw error;
    };

}

module.exports={throwError};