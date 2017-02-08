var mongoose=require('mongoose');
var Loc=mongoose.model('Location');

var sendJsonResponse=function(res,status,content){
	res.status(status);
	res.json(content);
};

module.exports.locationsListByDistance=function(req,res){
	sendJsonResponse(res,200,{
		"status":"success listing"
	});	
};

module.exports.locationsCreate=function(req,res){
	sendJsonResponse(res,200,{
		"status":"success creating"
	});	
};

module.exports.locationsReadOne = function(req, res) {
	var id=req.params.locationid;
	console.log(req.params);
	console.log("id is : " + id);
	Loc.findById(req.params.locationid).exec(function(err, location){
		sendJsonResponse(res,200,location);
	});
};

module.exports.locationsUpdateOne=function(req,res){

};

module.exports.locationsDeleteOne=function(req,res){

};