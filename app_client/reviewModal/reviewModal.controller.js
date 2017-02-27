(function () {
angular
.module('locatorApp')
.controller('reviewModalCtrl', reviewModalCtrl);
reviewModalCtrl.$inject = ['$uibModalInstance','locatorData', 'locationData'];
function reviewModalCtrl ($uibModalInstance,locatorData, locationData) {
var vm = this;
vm.locationData=locationData;

vm.modal = {
	close : function (result) {
$uibModalInstance.close(result);


},
cancel : function () {
$uibModalInstance.dismiss('cancel');
}
};
console.log("My name is " + locationData.locationid);
vm.doAddReview = function (locationid, formData) {
	locatorData.addReviewById(locationid, {
		author : formData.name,
		rating : formData.rating,
		reviewText : formData.reviewText
	})
	.then(function (data) {
		vm.modal.close(data);
	},function (data) {
		vm.formError = "Your review has not been saved, try again";
	});
		return false;
	};


vm.onSubmit = function () {
vm.formError = "";
if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
vm.formError = "All fields required, please try again";
return false;
} else {

vm.doAddReview(locationData.locationid, vm.formData);
}
};
}
})();