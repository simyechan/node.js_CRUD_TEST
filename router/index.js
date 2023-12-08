const express = require("express");
const cors = require("cors");
const app = express();
const whitelist = ["http://localhost"];

app.set("post", process.env.PORT || 3030);
app.set("host", process.env.HOST || "0.0.0.0");

app.use(
    cors({
        origin(req, res) {
            console.log("접속된 주소: " + req),
            -1 == whitelist.indexOf(req) && req
            ? res(Error("허가되지 않은 주소입니다."))
            : res(null, !0);
        },
        credentials: !0,
        optionsSuccessStatus: 200,
    })
);

app.all("/*", function (req, res, next){
    let ip = req.header.origin;
    (-1 == whitelist.indexOf(ip) && ip) ||
    (res.header("Access-Control-Allow-Origin", ip),
    res.header("Access-Control-Allow-Headers", "X-Requested-With"),
    next());
});

app.get("/", function (req, res){
    res.send("접속된 아이피: " + req.ip);
});

app.listen(app.get("port"), app.get("host"), () => 
    console.log(
        "Server is running on : " + app.get("host") + ":" + app.get("port")
    )
);