var express = require("express"),
    pager = require("./pager"),
    http = require("http"),
    app = express();

// In-memory data store
var data = {
    owners: require("../data/owners")
};

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.get("/owners", function (req, res) {
    var page = req.query.page || 1;
    res.json(pager(data.owners, page));
});

http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
