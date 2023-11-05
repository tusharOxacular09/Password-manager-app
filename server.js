const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const registerRouter = require("./src/api_routes/register_api");
const loginRouter = require("./src/api_routes/login_api");
const verifyUserRouter = require("./src/api_routes/verify_user_api");
const logoutRouter = require("./src/api_routes/logout_api");

const app = express();
dotenv.config();

// Testing api in cross origin
// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// endpoints
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/", verifyUserRouter);
app.use("/logout", logoutRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is runnoing on port ${process.env.PORT}`);
});
