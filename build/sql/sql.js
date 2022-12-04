"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.init = void 0;
const mysql_1 = require("mysql");
let pool;
/**
 * generates pool connection to be used throughout the app
 */
const init = () => {
    try {
        pool = (0, mysql_1.createPool)({
            connectionLimit: 4,
            host: 'localhost',
            user: 'root',
            password: 'Passwordxyz!',
            database: 'MOVIE',
            port: 3308
        });
        console.debug('MySql Adapter Pool generated successfully');
    }
    catch (error) {
        console.error('[mysql.connector][init][Error]: ', error);
        throw new Error('failed to initialized pool');
    }
};
exports.init = init;
/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
const execute = (query, params) => {
    try {
        if (!pool)
            throw new Error('Pool was not created. Ensure pool is created when running the app.');
        return new Promise((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error)
                    reject(error);
                else
                    resolve(results);
            });
        });
    }
    catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
};
exports.execute = execute;
