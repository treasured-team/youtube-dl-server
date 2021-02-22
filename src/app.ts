import express from 'express';
const cors = require('cors');
import { YoutubeDl } from "./YoutubeDl";
import http from "http"
import https from "https"
import fs from "fs"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.get('/v1/video', async (req, res) => {
    try {
        const url = req.query.url as string;
        const options = req.query.options as string;
        if (!url) {
            res.status(400);
            res.send('Missing url');
            return;
        }
        const metadata = await YoutubeDl.getVideoMetadata(url, options);
        console.log("OPTIONS", options)
        res.json(metadata);
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send(e);
    }
});

// app.listen(port, () => {
//     return console.log(`server is listening on http://localhost:${port}`);
// });

if (process.env.USE_HTTP) {
    // Start app
    http.createServer(app).listen(port, () => {
        // if (err) {
        //     throw err;
        // }
        console.log(`server is listening on http://localhost:${port}`);
    });
} else {
    // Start app
    const HTTPS_OPTIONS = {
        key: fs.readFileSync("certs/tls.key"),
        cert: fs.readFileSync("certs/tls.crt"),
    };
    https.createServer(HTTPS_OPTIONS, app).listen(port, () => {
        // if (err) {
        //     throw err;
        // }
        console.log(`server is listening on https://localhost:${port}`);
    });
}
