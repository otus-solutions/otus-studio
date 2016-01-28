(function() {

    angular
        .module('protocolSpecification')
        .service('TextQuestionParser', ['TextQuestion', TextQuestionParser]);

    function TextQuestionParser(TextQuestion) {
        var self = this;

        self.fromDom = fromDom;

        function fromDom(dom) {
            var question = new TextQuestion();
            question.labels[0].content[0].text = dom.children[0].children[0].children[1].value;
            return question;
        }
    }

}());
