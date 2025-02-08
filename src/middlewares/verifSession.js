import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import connection from "../dbConfigs/mysql.js";


export const verifSession = (req, res, next) => {
    const token = req.header('Authorization');
    // console.log(token);
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE5NCwiaWF0IjoxNzI4NzQzOTUzLCJleHAiOjE3Mjg3NDc1NTN9.WfJ239S6Kas8BbUD6L58K6FpM0EjjMCCyiZ7dU3fUFw"
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    
    // verifier le token
    let tokenVerify = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            // console.log(err);
            return res.status(401).json({ error: "Invalid token" });
        }else{
            connection.query("SELECT * FROM auth WHERE _id = ?", [decoded._id], (err, result) => {
                if (err) {
                    // console.log(err);
                    return res.status(500).json({ error: "server problem" });
                }
                if (result.length === 0) {
                    return res.status(401).json({ error: "Invalid token" });
                }else{
                    console.log("verifSession else ", result[0]);
                    req.user = result[0];
                    next();
                }
            });
        }
    });
}