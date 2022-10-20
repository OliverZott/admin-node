require('dotenv').config();
import express, { Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import DatabaseVsalidation from "./utils/db.validation"
import { dataSource } from "./data-source";

let databaseValidation = new DatabaseVsalidation();
databaseValidation.validateFileDatabase();
databaseValidation.validateMemoryDatabase();


// will read config from "ormconfig.json" automatically!!!


// load entities, establish db connection, sync schema, etc.
dataSource.connect().then(connection => {

    const app = express();

    app.use(express.json());    // to handle request as JSON
    app.use(cookieParser());    // to be able to retrieve cookies from api
    app.use(cors({      // app runs on port 8000 but all frontend run on different ports!
        credentials: true,      // so frontend gets cookies
        origin: ["http://localhost:3000"]
    }));

    routes(app);

    app.listen(process.env.PORT as unknown as number || 8000, () => {
        console.log("Listening to port 8000");
    });


    // EXAMPLE 1:
    app.get('/', (req, res) => {
        res.send("Hello World =)");
    });
    // EXAMPLE 2: "routes(app);"  is the same as:
    app.post('/api/register2', (req: Request, res: Response) => {
        res.send("Test two!");
    })

});
