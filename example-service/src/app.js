// Simple Mongoose Example of an Activity Index
//
// This is a NodeJS Express application 
//
const fs = require("fs");
const cors = require("cors");
const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const Keycloak = require('keycloak-connect');

// Read our Keycloak config file
const keycloakConfig = JSON.parse(fs.readFileSync("./keycloak.json"));

// Constants
const PORT = (process.env.port || 3000);

// Create an instance of the express class and declare our port
const app = express();
const memory = new session.MemoryStore();
const keycloak = new Keycloak({store: memory}, keycloakConfig);
const USE_KEYCLOAK = true;

// Set up our session        
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        store: memory
    })
);

// Set EJS as our view engine for partial templates
app.set("view engine", "ejs");
app.set('json spaces', 2);

// Use our keycloak middleware overall
//
// This will seem a bit redundant as we also declare it at the bottom here.  
// If this is removed, then it causes an infinite redirect loop between Keycloak
// and this service.  I don't really know why this happens, but I assume this 
// middleware initializes something that is required for subsequent calls.  
//  
if (USE_KEYCLOAK)
    app.use(keycloak.middleware());

// Boiletplate middleware
app.use(bodyParser.json())
app.use(cors())

// Get our static files.  We're keeping these in a few different places, so this
// might get sort of confusing when looking directly at the href paths
app.use(express.static("public"));
app.use(express.static("views"));

// Set our renderer and configurations
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));

// A slightly different take on the Keycloak middleware protection.
//
// We're going to protect the request while checking to see if the user has an "admin" role
// on the Keycloak realm itself.  If that's the case, we'll pass that to the rendering of
// index.ejs to show on the page.
//
if (USE_KEYCLOAK) {
    app.use(function(req, res, next) {

        // Use a callback to check whether our user's token has the given
        // roles required to access parts of the site.
        //
        function confirmRoles(token, request) {

            // At the time of this callback, we'll already have a token from
            // the Keycloak user.  The role confirmation will just be here
            // to append that role verification to the response variable.
            //
            res.locals.admin = token.hasRole("realm:admin");

            // False here will force a hideous redirect to the Keycloak "permission denied"
            // page, so we'll want to handle that more gracefully.
            return true;
        }

        // Unpack the middleware
        let protect = keycloak.protect(confirmRoles);

        protect(req, res, next);
    })
    
    // Get our user information
    app.use(function(req, res, next){
        
        // This isn't really documented, but we can use the access token to get our user info
        if (req.kauth && req.kauth.grant && req.kauth.grant.access_token) {
            let content = req.kauth.grant.access_token.content;

            res.locals.id = content.sub;
            res.locals.username = content.preferred_username;

            console.log(req.kauth.grant.access_token.content)
        }
        next();
    });
}

// Only one page
app.get("/", function(req, res, next){
    res.render("index", {
        admin: res.locals.admin,
        id: res.locals.id,
        user: res.locals.username
    });
});
app.get("*", function(req, res, next){
    res.redirect("/");
});

// There's a problem if this is included earlier, not sure why
if (USE_KEYCLOAK) {
    app.use(keycloak.middleware({
        logout: '/'
    }));
}

// Start the service
app.listen(PORT, function () {
    console.log(`\n[Server] listening on port ${PORT} ...`)
});