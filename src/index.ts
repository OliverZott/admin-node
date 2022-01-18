import express, {Request, Response} from "express";
import cors from "cors";
import {routes} from "./routes";
import {createConnection} from "typeorm";


// will read config from "ormconfig.json" automatically!!!
createConnection().then(connection => {

    const app = express();

    app.use(express.json());    // to handle request as JSON
    app.use(cors({      // app runs on port 8000 but all frontend run on different ports!
        origin: ["http://localhost:3000"]
    }));

    routes(app);

    app.listen(8000, () => {
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
