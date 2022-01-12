import express, {Request, Response} from "express";
import cors from "cors";
import {routes} from "./routes";


const app = express();

// to handle request as JSON
app.use(express.json());

// app runs on port 8000 but all frontends run on different ports!
app.use(cors({
    origin: ["http://localhost:3000"]
}));


routes(app);

app.listen(8000, () => {
    console.log("Listening to port 8000");
});


// "routes(app);"  is the same as:
app.post('/api/register2', (req: Request, res: Response) => {
    res.send("Test two!");
})

// Example
app.get('/', (req, res) => {
    res.send("Hello World =)");
});

