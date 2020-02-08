require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("server up and running on PORT : ", process.env.APP_PORT);
});

