const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token){
            token = token.slice(7);
            verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if (err){
                    res.json({
                        success: 0,
                        message: "invalid token!"
                    });
                } else {
                    next();
                }
            })
        } else {
            res.json({
                success: 0,
                message: "Acess denied! unautorized user"
            })
        }
    }
}
