(function() {

    angular
        .module('protocolSpecification')
        .service('TextQuestionParser', ['TextQuestionFactory', TextQuestionParser]);

    function TextQuestionParser(TextQuestionFactory) {
        var self = this;

        self.fromDom = fromDom;

        function fromDom(dom) {
            var question = TextQuestionFactory.create();
            question.labels[0].content[0].text = dom.children[0].children[0].children[1].value;
            return question;
        }
    }

}());
