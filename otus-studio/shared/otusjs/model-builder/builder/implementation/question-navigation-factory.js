(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .factory('QuestionNavigationFactory', QuestionNavigationFactory);

    function QuestionNavigationFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new QuestionNavigation();
        }

        return self;
    }

    function QuestionNavigation() {
        var self = this,
            head = null,
            tail = null;

        self.size = 0;

        /* Public interface */
        self.isEmpty = isEmpty;
        self.addAtBegin = addAtBegin;
        self.addAtEnd = addAtEnd;
        self.addAt = addAt;
        self.removeFromBegin = removeFromBegin;
        self.removeFromEnd = removeFromEnd;
        self.removeFrom = removeFrom;
        // self.replaceAt = replaceAt;
        // self.replaceAtEnd = replaceAtEnd;

        function addAtBegin(question) {
            if (isEmpty()) {
                initializeList(question);
            } else {
                question.nextQuestion = head;
                head.previousQuestion = question;
                head = question;
                ++self.size;
            }
        }

        function addAtEnd(question) {
            if (isEmpty()) {
                initializeList(question);
            } else {
                question.previousQuestion = tail;
                tail.nextQuestion = question;
                tail = question;
                ++self.size;
            }
        }

        function addAt(index, question) {
            if (isEmpty()) {
                initializeList(question);
            } else if (index > 0) {
                if (index >= self.size) {
                    addAtEnd(question);
                } else {
                    add(index, question);
                }
            }
        }

        function add(index, question) {
            var currentQuestionAtIndex = getFrom(index);

            currentQuestionAtIndex.previousQuestion.nextQuestion = question;
            question.previousQuestion = currentQuestionAtIndex.previousQuestion;
            question.nextQuestion = currentQuestionAtIndex;
            currentQuestionAtIndex.previousQuestion = question;
            ++self.size;
        }

        function removeFromBegin(question) {
            if (!isEmpty()) {

            }
        }

        function removeFromEnd(question) {

        }

        function removeFrom(index, question) {
            if (!isEmpty()) {
                if (index === 0) {
                    removeFromBegin(question);
                } else if (index === (self.size - 1)) {
                    removeAtEnd(question);
                } else {
                    add(index, question);
                }
            }
        }

        function remove(index, question) {

        }

        function getFrom(index) {
            if (isEmpty()) {
                return null;
            } else if (index > self.size || index < 0) {
                return null;
            } else {
                return goToNext(head, index, 0);
            }
        }

        function isEmpty() {
            return (self.size === 0);
        }

        /* ================= Private ================= */
        function initializeList(question) {
            head = question;
            tail = question;
            self.size = 1;
        }

        function goToNext(question, indexToSearch, currentIndex) {
            if (indexToSearch === currentIndex) {
                return question;
            }
            return goToNext(question.nextQuestion, indexToSearch, ++currentIndex);
        }
    }

}());
