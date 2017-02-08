var mongoose=require('mongoose');
var Loc=mongoose.model('Location');

var sendJsonResponse=function(res,status,content){
	res.status(status);
	res.json(content);
};

module.exports.reviewsCreate=function(req,res){
	sendJsonResponse(res, 200, {
		"status": "very successful"
	});
};

module.exports.reviewsReadOne=function(req,res){
	sendJsonResponse(res,200,{
		"status":"success reading review"
	});	
};
module.exports.reviewsUpdateOne=function(req,res){
	
};
module.exports.reviewsDeleteOne=function(req,res){
	
};