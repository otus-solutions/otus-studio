(function(){
	'use strict';
	
	angular
    .module('otusjs.modelBuilder')
    .service('MetadataAnswerBuilderService', MetadataAnswerBuilderService);
	
	MetadataAnswerBuilderService.$inject = ['MetadataAnswerFactory'];

	function MetadataAnswerBuilderService(MetadataAnswerFactory) {
		var self = this,
			 observers = [],
	         workResult = null;
		
		 /* Public interface */
        self.runValidations = runValidations;
		self.execute = execute;
        self.getWorkResult = getWorkResult;
        
        /* Observable interface */
        self.registerObserver = registerObserver;

        // TODO: Implement validator to run here
        function runValidations(work) {
            workResult = true;
        }

        function getWorkResult() {
            return {
                result: workResult
            };
        }
        
        function execute(work) {
        	var metadataOption = null;
        	
        	 if (work.type.isAddData()) {
        		 metadataOption = addOption(work);
             } else if (work.type.isRemoveData()) {
            	 metadataOption = removeOption(work);
             } else if (work.type.isUpdateData()) {
            	 metadataOption = updateOption(work);
             }

             notifyObservers(metadataOption, work.type);
        }
        
        function addOption(work) {
            var selectedQuestion = extractQuestionReference(work.target);
            var nextOID = Object.keys(work.survey.question[selectedQuestion].option).length;

            var newOption = MetadataAnswerFactory.create(nextOID, selectedQuestion);
            work.survey.question[selectedQuestion].metadata.option[nextOID] = newOption;

            return newOption;
        } 
        
        function removeOption(work) {
        	var selectedQuestion = extractQuestionReference(work.target),
                indexToRemove = Object.keys(work.survey.question[selectedQuestion].option).length - 1,
                optionToRemove = work.survey.question[selectedQuestion].metadata.option[indexToRemove];

            delete work.survey.question[selectedQuestion].metadata.option[indexToRemove];
            return optionToRemove;
        }
        
        function updateOption(work) {
        	var selectedQuestion = extractQuestionReference(work.target),
                selectedOption = work.target.split('.')[4],
                optionToUpdate = work.survey.question[selectedQuestion].metadata.option[selectedOption];

            optionToUpdate.label.ptBR.plainText = work.data.plainText || work.data.value;
            optionToUpdate.label.ptBR.formattedText = work.data.formattedText;
            return optionToUpdate;
        }
        
        function extractQuestionReference(target) {
            return target.split('.')[2];
        }
        
        function notifyObservers(question, work) {
            work.data = question;
            observers.forEach(function(observer) {
                observer.update(work);
            });
        }

        function registerObserver(observer) {
            observers.push(observer);
        }
        
	}
	
}()); 