import express from 'express';
import req from "express/lib/request.js";
import res from "express/lib/response.js";
const app = express();
const port = 8000;


app.get('/', (req, res) => {
    res.send("Hello World!");
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
