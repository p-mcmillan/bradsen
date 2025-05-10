import { h as handler } from "__SSR_HANDLER__";
import { loadEnv } from "dotenv-local";
import express from "express";
import compression from "compression"; // ✅ ADD THIS
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASENAME = "";
const CLIENT_DIR = path.join(__dirname, "client");
const ASSETS_DIR = path.join(CLIENT_DIR, "assets");

const HOST = process.env.SERVER_HOST || "0.0.0.0";
const PORT = process.env.SERVER_PORT || 3001;

const app = express();

// ✅ ENABLE COMPRESSION
app.use(compression());

app.use((req, res, next) => {
  if (req.url === "") {
    res.redirect(BASENAME);
  } else {
    next();
  }
});

app.use(
  "/assets",
  express.static(ASSETS_DIR, {
    maxAge: "1y",
    immutable: true,
  })
);

app.use(
  express.static(CLIENT_DIR, {
    maxAge: "1y",
    index: false,
  })
);

const route = express.Router();
route.use(express.static(CLIENT_DIR));
route.use(handler);
app.use(BASENAME, route);

app.use((_, res) => {
  res.status(404).send("Not Found");
});
app.use((err, _, res) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app
  .listen(PORT, HOST, () => {
    console.log(`✅ Server is listening on http://${HOST}:${PORT}`);
  })
  .on("error", (error) => {
    console.error("Server error:", error);
  });

// import { h as handler } from "__SSR_HANDLER__";
// import { loadEnv } from "dotenv-local";
// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// const BASENAME = "";
// const CLIENT_DIR = path.join(__dirname, "client");
// const ASSETS_DIR = path.join(CLIENT_DIR, "assets");

// const HOST = process.env.SERVER_HOST || "0.0.0.0";
// const PORT = process.env.SERVER_PORT || 3000;

// const app = express();

// app.use((req, res, next) => {
//   if (req.url === "") {
//     res.redirect(BASENAME);
//   } else {
//     next();
//   }
// });

// app.use("/assets", express.static(ASSETS_DIR));
// app.use(express.static(CLIENT_DIR));

// const route = express.Router();
// route.use(express.static(CLIENT_DIR));
// route.use(handler);
// app.use(BASENAME, route);

// app.use((_, res) => {
//   res.status(404).send("Not Found");
// });
// app.use((err, _, res) => {
//   console.error(err);
//   res.status(500).send("Internal Server Error");
// });

// app
//   .listen(PORT, HOST, () => {
//     console.log(`Server is listening on http://${HOST}:${PORT}`);
//   })
//   .on("error", (error) => {
//     console.error("Server error:", error);
//   });
