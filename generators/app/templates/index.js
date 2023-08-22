import dotenv from "dotenv";
import cors from "cors";
import express from "express";
<% if (mongodb) { %>
import database from "./config/database.js";
<% } %>
<% if (auth) { %>
import Routes from "./routes/index.js";
<%}%>
const api_version = process.env.API_VERSION;
dotenv.config({ path: ".env" });
const app = express();
<% if (mongodb) { %>
database();
<% } %>
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
<% if (auth) { %>
app.use(`/api/${api_version}`, Routes);
<% } %>

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`Server running bro! ${process.env.APP_PORT || 3000}`);
});

export default app;
