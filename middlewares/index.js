import express from 'express';
import cors from 'cors';

const Middlewares = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    
        if (req.method === 'OPTIONS') {
            res.end();
        } else {
            next();
        }
    });
};

export default Middlewares;