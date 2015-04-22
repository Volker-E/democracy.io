/**
 *
 */
var findWhere = require('lodash.findWhere')

var CaptchaController = function($scope, $location, $timeout, dioApi) {

	$scope.loadingDelay = true;
	$timeout(function(){
      $scope.loadingDelay = false;
    },
    350);

    $scope.captchasRemaining = 1; // TODO make this check for more captchas

    // stub for loading captcha
    $timeout(function(){
    	$scope.captchasReceived = [
    		{
    			link: '/captchas/e410e577123c5e19a526ad3f6b.png', 
    			uid: '123456',
    			answer: '',
    			success: false,
    			waitingForResponse: false
    		}
    	]
    },
    1000);
    // end stub

    $scope.submit = function(captcha){
    	captcha.waitingForResponse = true;

    	var cb = function(response){
    		if (response.success){
    			captcha.success = true
    			$scope.captchasRemaining -= 1;
    		} else {
    			//TODO - work up fail state
    		}

    		if ($scope.captchasRemaining === 0){
    			$location.path('/thanks')
    		}
    	}
    	
    	dioApi.submitCaptchaResponse(captcha.uid, captcha.answer, cb);
    }
};

module.exports = CaptchaController;