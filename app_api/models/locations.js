var mongoose=require('mongoose');

//			openingTimesSchema
var openingTimeSchema=new mongoose.Schema({
	days:{type: String, required:true},
	opening: String,
	closing: String,
	closed:{type:String, required:true}
});	

//			reviewSchema
var reviewSchema=new mongoose.Schema({
	author: {type: String, required: true},
	rating: {type: Number,  min:0, max: 5, required:true},
	reviewText: {type:String, required: true},
	createdOn:{type:Date, "default":Date.now},
});

 /* 		Main Schema 	*/
var locationSchema=new mongoose.Schema({
	name: {type: String,
			required: true},
	address: String,
	rating: {type: Number,
			"default": 0,
			min: 0,
			max: 5},
	facilities: [String],

/* 		Use 2dsphere to add support for GeoJSON longitude and latitude coordinate pair	*/
	coords: {type:[Number], index:'2dsphere'}, 

//			Reference subSchemas to add nested subDocuments
	openingTimes: [openingTimeSchema],
	reviews:[reviewSchema]
});

// 			Compile schema into model
mongoose.model('Location', locationSchema);