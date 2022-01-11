import express from "express";
import cors from "cors";


const app = express();

// to handle request as JSON
app.use(express.json());
// app runs on port 8000 but all frontends run on different ports!
app.use(cors({
    origin: ["http://localhost:3000"]
}));


app.get('/', (req, res) => {
    res.send("Hello World =)");
});


app.listen(8000, () => {
    console.log("Listening to port 8000");
});
