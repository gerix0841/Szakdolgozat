const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup",
    port: 3307
});

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    //Ellenőrizzük, hogy van-e már ilyen felhasználó vagy email cím az adatbázisban
    const checkUserQuery = 'SELECT * FROM login WHERE username = ? OR email = ?';
    db.query(checkUserQuery, [username, email], (err, data) => {
        if (err) {
            return res.json('Error');
        }

        if (data.length > 0) {
            //Ha már van
            return res.json('RegFail');
        } else {
            //Ha nincs
            const insertUserQuery = 'INSERT INTO login (username, email, password) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [username, email, password], (err, result) => {
                if (err) {
                    return res.json('Error');
                }
                return res.json('RegSuc');
            });
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
    const values = [
        req.body.username,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        }
        else{
            return res.json("Failed");
        }
    });
});

const createAdminUser = () => {
    const adminUser = {
        username: 'admin',
        email: 'admin@admin.hu',
        password: 'admin'
    };

    const sql = 'INSERT INTO login (username, email, password) VALUES (?, ?, ?)';
    const values = [adminUser.username, adminUser.email, adminUser.password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Sikeres!');
        }
    });
};

app.listen(8081, () => {
    console.log("listening")
    createAdminUser();
});
