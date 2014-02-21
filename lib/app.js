var express = require("express"),
    pager = require("./pager"),
    http = require("http"),
    app = express();

// In-memory data store
var data = {
    owners: require("../data/owners")
};

// Setup Express app
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// Routes related to owners
app.get("/owners", function (req, res) {
    var page = req.query.page || 1;
    return res.json(pager(data.owners, page));
});

app.get("/owners/:owner", function (req, res) {
    var owner = data.owners.filter(function (owner) {
        return owner.id === +req.params.owner;
    })[0];
    if (owner) {
        return res.json(owner);
    }
    return res.send(404);
});

// Start server
http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
