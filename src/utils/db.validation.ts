const sqlite3 = require('sqlite3').verbose();

// let db = new sqlite3.Database('./db/database.db');

export default class DatabaseValidation {

    validateMemoryDatabase() {
        let db = new sqlite3.Database(':memory:', (err: any) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        });
    }

    validateFileDatabase() {
        let db = new sqlite3.Database('src/data/node_admin.db', (err: any) => {
            if (err) {
                console.error(`WTF: ${err.message}`);
            }
            console.log('Connected to the node_admin database.');
        });
    }

}

