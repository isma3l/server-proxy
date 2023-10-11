import express from 'express';
import path from 'path';
import axios from 'axios';
import Middlewares from "../middlewares/index.js";

const handler = (req, res) => {
  async function fecthUrl(url) {
    try {
      const response = await axios.get(url);
      const contentType = response.headers.get("content-type");
      res.setHeader("content-type", contentType)
      res.status = response.status;

      if (contentType.includes("json")) {
        res.json(response.data);
      } else {
        res.send(response.data);
      }

    } catch (error) {
      res.status = 500;
      res.json({ type: 'error', message: error.message });
    }
  }
  
  if (req.query.url) {
    fecthUrl(req.query.url);
  } else {
    res.send("missing url parameter");
  }
}

const handlerPost = (req, res) => {
  async function postUrl(originalUrl) {
    const url = originalUrl.substring(originalUrl.indexOf("https://api.themoviedb"));
    
    try {
      const response = await axios.post(url, req.body);
      res.status = response.status;
      res.json(response.data);

    } catch (error) {
      res.status = 500;
      res.json({ type: 'error', message: error.message });
    }
  }
  
  if (req.query.url) {
    postUrl(req.originalUrl);
  } else {
    res.send("missing url parameter");
  }
}

const port = process.env.PORT || 3005;
const app = express();
Middlewares(app);

app.use("/api", (req, res) => {
  if (req.method === "POST") {
    //sconst url = req.originalUrl.substring(originalUrl.indexOf("https://api.themoviedb"));
    res.json({ miUrl: req.originalUrl});
    
    //handlerPost(req, res)
  } else {
    handler(req, res);
  }
});

app.use('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(port);

export default app;