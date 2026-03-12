const students =require ('./students');
const { verifyAccess } =require('./logic');
const jwt=require('jsonwebtoken');
function authenticate(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send("Authorization is missing");
    }
    try{
        const user_metadata=verifyAccess(token)
        console.log(`Authorizing user ${JSON.stringify(user_metadata)}`)

        if(req.originalUrl=="/admin/dashboard"){
            if(user_metadata.role=="admin"){
                next()
            }else{
                res.status(401).send("User with insufficient permissions")
            }
        }else{
            const student= students.where((stu)=>stu.email==user_metadata.email && stu.access ==true)
        console.log(student)
        console.log(req.path)
         if(student.length>0){
            next()
               
            }
        }}catch(err){
            res.send(err);

    }}
    module.exports = {authenticate};

            
          
       
    //     const decoded = jwt.verify(token)
    // next()
    // }catch(err){
    //     res.status(401).send("Authorization failed")