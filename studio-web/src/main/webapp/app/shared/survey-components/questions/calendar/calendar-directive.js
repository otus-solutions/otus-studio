(function() {

	var dateQuestion = function() {
		var directive = {
				templateUrl : "shared/survey-components/questions/calendar/calendar-question-template.html",
				restrict : "E"
		};
		return directive;
	};
	
	angular
		.module('survey.questions')
		.directive('calendarQuestion', dateQuestion);

}());