require('dotenv').config()
//require modules
const express = require("express")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const session = require("express-session")
const PORT = 3000

const app = express()

//require db
require("./db/db")

//middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use((req, res, next) => {
	try {
		if(req.session.loggedIn) {
			res.locals.user = req.session.user
		} else {
			res.locals.user = undefined
		}
		next()// 
	} catch(err) {
		next(err)
	}
})


//controllers
const userController = require("./controllers/user-controller")
app.use("/user", userController)


const movieReviewController = require("./controllers/movieReviewController")
app.use("/movies", movieReviewController)

app.listen(PORT, () => {
	console.log("listening on port ", PORT);
})