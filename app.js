var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	app 		= express();

// APP CONFIG
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost/news_site");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

// MONGOOSE/MODEL CONFIG
var articleSchema = new mongoose.Schema(
	{
		title: String,
		image: String,
		content: String,
		like: 
		{
			type: Number,
			default: 0
		},
		dislike: 
		{
			type: Number,
			default: 0
		},
		created: 
		{	
			type: Date,
			default: Date.now
		}
	}
);

var Article = mongoose.model("Article", articleSchema);

// RESTFUL ROUTES

// Index Route
app.get("/articles", function(req, res) {
	Article.find({}, function(err, articles) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {articles: articles});
		}
	});
});

// Create Route
app.post("/articles", function(req, res) {
	Article.create(req.body.article, function(err, article) {
		if (err) {
			console.log(err);
			res.render("new");
		} else {
			res.redirect("/articles");
		}
	});
});

// New Route
app.get("/articles/new", function(req, res) {
	res.render("new");
});

// Root Route
app.get("/", function(req, res) {
	res.redirect("/articles");
});

app.listen(3000, function() {
	console.log("Server started on port 3000.");
});
