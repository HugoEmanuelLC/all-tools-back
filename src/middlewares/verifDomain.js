import connection from "../dbConfigs/mysql.js";

export const verifDomain = (req, res) => {
    const userId = req.user._id;
    
    connection.query("SELECT * FROM domain_list WHERE _fk_auth = ?", userId, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "server problem" });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "No domain found" });
        }else{
            return res.status(200).json({ message: "domain ok", domain: result[0] });
        }
    });
};