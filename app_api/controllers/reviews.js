var mongoose=require('mongoose');
var Loc=mongoose.model('Location');
var User=mongoose.model('User');

var sendJsonResponse=function(res,status,content){
	res.status(status);
	res.json(content);
};

//		function setAverageRating
var doSetAverageRating=function(location){
	var i, reviewCount, ratingAverage, ratingTotal;
	if(location.reviews && location.reviews.length>0){
		reviewCount=location.reviews.length;
		ratingTotal=0;
		for(i=0; i<reviewCount; i++){
			ratingTotal+=location.reviews[i].rating;
		}
		ratingAverage=parseInt(ratingTotal/reviewCount, 10);
		location.rating=ratingAverage;
		location.save(function(err){
			if (err) {
				console.log(err);
			}
			else{
				console.log("Average rating updated to ", ratingAverage);
			}
		});
	}
};

//		function updateAverageRating
var updateAverageRating=function(locationid){
	Loc
		.findById(locationid)
		.select('rating reviews')
		.exec(function(err, location){
			if(!err){
				doSetAverageRating(location);
			}
		});
};

//		function doAddReview 
var doAddReview=function(req, res, location, author){
	
    console.log("author missing here at app server");
	if (!location) {
		sendJsonResponse(res, 404, {
			"message":"locationid not found"
		});
	}else{
		location.reviews.push({
			author:author,
			rating:req.body.rating,
			reviewText:req.body.reviewText
		});
		location.save(function(err, location){
			var thisReview;
			if(err){
				console.log(err);
				sendJsonResponse(res,400, err);
			}
			else{
				updateAverageRating(location._id);
				thisReview=location.reviews[location.reviews.length-1];
				sendJsonResponse(res,201, thisReview);
			}
		});
	}
};

// function to getAuthor
var getAuthor=function(req, res, callback){
	if (req.payload && req.payload.email) {
		User
			.findOne({email: req.payload.email})
			.exec(function(err, user){
				if (!user) {
					sendJsonResponse(req, 404, {
						"message": "User not found"
					});
					return;
				}else if (err) {
					console.log(err);
					sendJsonResponse(res, 404, err);
					return;
				}
				callback(req, res, user.name);
			});
	}else{
		sendJsonResponse(res, 404,{
			"message": "User not found"
		});
		return;
	}
};

//	 Create a new review
module.exports.reviewsCreate=function(req,res){
	getAuthor(req, res, function(req, res, userName){
		var locationid=req.params.locationid;
		if (locationid) {
			Loc
				.findById(locationid)
				.select('reviews')
				.exec(
					function(err, location){
						if (err) {
							sendJsonResponse(res,400,err);
						}
						else{
							doAddReview(req,res,location, userName);
						}
					});
		}
		else{
			sendJsonResponse(res,400,{
				"message":"Not found ! locationid required"
			});
		}
	});
};


//		Read a review
module.exports.reviewsReadOne=function(req,res){
	if (req.params && req.params.locationid && req.params.reviewid) {
		Loc
			.findById(req.params.locationid)
			.select('name reviews')
			.exec(function(err,location){
				var response, review;
				if(!location){
					sendJsonResponse(res,404,{
						"message": "Locationid not found"
					});
					return;
				}else if(err){
					sendJsonResponse(res,400, err);
					return;
				}
				if (location.reviews && location.reviews.length>0) {
					//console.log("location review contains : " + location.reviews);
			//		console.log("id is " + req.params.reviewid);
				
					review=location.reviews.id(req.params.reviewid);
				
				//sendJsonResponse(res, 200, location.reviews);
					if(!review){
						sendJsonResponse(res,404, {
							"message": "reviewid not found"
						});
					}else{
						response={
							location:{
								name:location.name,
								id:req.params.locationid
							},
							review:review
						};
						sendJsonResponse(res,200, response);
					}
				}else{
					sendJsonResponse(res, 404, {
						"message": "No review found"
					});
				}
			});
	}
	else{
		sendJsonResponse(res,404,{
			"message":"Not found,  locationid and reviewid are both required"
		});
	}
};


//		Update a review
module.exports.reviewsUpdateOne=function(req,res){
	if(!req.params.locationid || !req.params.reviewid){
		sendJsonResponse(res, 404, {
			"message": "Not found,  locationid and reviewid are both requierd"
		});
		return;
	}
	Loc
		.findById(req.params.locationid)
		.select('reviews')
		.exec(
			function(err, location){
				var thisReview;
				if (!location) {
					sendJsonResponse(res, 404, {
						"message": "locationid not found"
					});
					return;
				}else if(err){
					sendJsonResponse(res, 400, err);
					return;
				}
				if (location.reviews && location.reviews.length>0) {
					thisReview=location.reviews.id(req.params.reviewid);
					if(!thisReview){
						sendJsonResponse(res,404, {
							"message": "reviewid not found"
						});
					}else{
						thisReview.author=req.body.author;
						thisReview.rating=req.body.rating;
						thisReview.reviewText=req.body.reviewText;
						location.save(function(err, location){
							if (err) {
								sendJsonResponse(res, 400, err);
							}
							else{
								updateAverageRating(location._id);
								sendJsonResponse(res, 200, thisReview);
							}
						});
					}
				}else{
					sendJsonResponse(res, 404, {
						"message":"No review to update"
					});
				}
			});
};


//		Delete a review based on location and review id
module.exports.reviewsDeleteOne=function(req,res){
	if(!req.params.locationid || !req.params.reviewid){
		sendJsonResponse(res, 404, {
			"message": "Not found, location id and review id are both required"
		});
		return;
	}
	Loc
		.findById(req.params.locationid)
		.select('reviews')
		.exec(
			function(err, location){
				if(!location){
					sendJsonResponse(res, 404, {
						"message": "locationid not found"
					});
					return;
				}else if(err){
					sendJsonResponse(res, 400, err);
					return;
				}
				if (location.reviews && location.reviews.length>0) {
					if(!location.reviews.id(req.params.reviewid)){
						sendJsonResponse(res, 404, {
							"message":"reviewid not found"
						});
					}else{
						location.reviews.id(req.params.reviewid).remove();
						location.save(function(err){
							if (err) {
								sendJsonResponse(res, 404, err);
							}else{
								updateAverageRating(location._id);
								sendJsonResponse(res, 204, null);
							}
						});
					}
				}
				else{
					sendJsonResponse(res, 404, {
						"message":"No review to delete"
					});
				}
			});
};