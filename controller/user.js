const pool = require('../config/database');
const crypt = require('../util/crypt');

module.exports = {
    create(req, res) {
        let account = {...req.body};
        console.log({body: req.body})
        account.password = crypt.SHA1(account.password);

       

        let query = `INSERT INTO user (email,password, createdAt) VALUES ('${account.email}','${account.password}', ${new Date()});`

        pool.query(query, (err, results) => {
            if (err) throw err;
            console.log({results})
        })
    }
}