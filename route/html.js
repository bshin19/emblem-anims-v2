export default htmlRoutes = (app) => {

	// Home
	app.get("/", function (req, res) {
		res.render("index");
	});
};
