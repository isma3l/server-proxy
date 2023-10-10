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
    console.log("originalUrl", originalUrl);
    const url = originalUrl.replace("/api-post?url=", "")
    console.log("URL", url, "FINAL");
    try {
      const response = await axios.post(url, req.body);
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
    postUrl(req.originalUrl);
  } else {
    res.send("missing url parameter");
  }
}

const port = process.env.PORT || 3005;
const app = express();
Middlewares(app);

app.use("/api", (req, res) => {
  handler(req, res);
});

app.use("/api-post", (req, res) => {
  handlerPost(req, res);
});

app.use('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(port);

export default app;