const authorize = (permittedrole) => {
    return (req, res, next) => {

        const user = req.user;
        let isPermitted = false;

        permittedrole.map(role =>{
            if(user.role == role){
                isPermitted = true;
            }
        })

        if(isPermitted){
            return next();
        }else{
            return res.status(401).send({message : "You are not authorized to perform this operation"});
        }
        
    }
}

module.exports = authorize;