(function() {

    angular
        .module('protocolSpecification')
        .service('CheckboxQuestionParser', ['CheckboxQuestion', CheckboxQuestionParser]);

    function CheckboxQuestionParser(CheckboxQuestion) {
        var self = this;

        self.fromDom = fromDom;

        function fromDom(dom) {
            var question = new CheckboxQuestion();
            question.labels[0].content[0].text = dom.children[0].children[1].children[1].value;
            return question;
        }
    }

}());
