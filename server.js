

const server = create();
const router = _router("db.json");
const middlewares = defaults();


server.use(middlewares);


// Custom middleware to access POST methids.
// Can be customized for other HTTP method as well.
server.use((req, res, next) => {
    console.log("POST request listener");
    const body = req.body;
    console.log(body);
    if (req.method === "POST") {
        // If the method is a POST echo back the name from request body
        console.log(req.baseUrl.toString());
        res.json({ message: "User created successfully", name: req.body.name });
    } if (req.method === "GET" && req.url === "/register/listAdherent") {
        console.log("hi");
        res.json(router.db.get("adherantList"));
    }
    else {
        //Not a post request. Let db.json handle it
        next();
    }
});

server.use(router);

createServer(options, server).listen(3000, function () {
    console.log("json-server started on port " + 3000);
});