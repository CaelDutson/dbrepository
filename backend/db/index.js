const Pool = require('pg').Pool;

let dbURL = {
    connectionString: process.env.DATABASE_URL  || 'postgres://postgres:postgres@localhost:5432/postgres'
}

const pool = new Pool(dbURL);

pool.connect();
exports.getUsers = (req, res) => {
    pool.query('SELECT * from users', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
}  

exports.login = async (username) => { 
    const results = await pool.query('SELECT * from users where username = $1', [username]) 
    console.log(results.rows[0])
    return json(results.rows[0]);
} 

exports.register = (data, res) => { 
    console.log(data.body) 
    pool.query(`insert into users (username, password) values ('${data.body.username}', '${data.body.password}')`, (err, results) => {  
        if(err) throw err;
        console.log(results)
    })
}

