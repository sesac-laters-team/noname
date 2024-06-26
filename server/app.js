const express = require("express");
const app = express();
const session = require("express-session");
const router = require("./routes/router");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const { sequelize } = require("./models");
const http = require("http");
const server = http.createServer(app);
const gameServer = http.createServer(app);
const socketHandler = require("./sockets/index");
const tetrisSocketHandler = require("./sockets/tetris");
const cors = require("cors");
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", "./admin");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

socketHandler(server);
tetrisSocketHandler(gameServer);

// 세션 설정
const sessionConfig = {
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        signed: true,
    },
};
app.use(session(sessionConfig));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// 라우터 설정
app.use("/api-server", router);
app.use("/api-server/auth", authRouter);
app.use("/api-server/admin", adminRouter);

// swagger
const { swaggerUi, swaggerSpec } = require("./routes/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 시퀄라이즈
sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("db connected");
        });
    })
    .catch((err) => {
        console.log(err);
    });

// 소켓 서버 설정
server.listen(process.env.PORT_SOCKET, () => {
    console.log("socket server open");
});

// 게임서버 소켓 설정
gameServer.listen(process.env.PORT_SOCKET_GAME, () => {
    console.log(`game server open port ${process.env.PORT_SOCKET_GAME}`);
});
