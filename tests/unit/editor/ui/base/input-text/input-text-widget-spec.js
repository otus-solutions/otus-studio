describe('OtusInputTextWidget', function() {
    var factory;
    var widget;
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('OtusInputTextWidgetFactory');
        });

        mockElement();
    });

    describe('template configuration', function() {

        describe('with full configuration', function() {

            beforeEach(function() {
                mockFullTemplateConfig();
                widget = factory.create({}, Mock.templateConfig, Mock.element, {});
            });

            it('should have the ariaLabel property defined', function() {
                expect(widget.template.ariaLabel).toBeDefined();
            });

            it('should have the label property defined', function() {
                expect(widget.template.label).toBeDefined();
            });

            it('should have the leftIcon property defined', function() {
                expect(widget.template.leftIcon).toBeDefined();
            });

            it('should have the rightIcon property defined', function() {
                expect(widget.template.rightIcon).toBeDefined();
            });

        });

        describe('with default values', function() {

            beforeEach(function() {
                widget = factory.create({}, {}, Mock.element, {});
            });

            it('should have the ariaLabel property undefined', function() {
                expect(widget.template.ariaLabel).toBeUndefined();
            });

            it('should have the label property undefined', function() {
                expect(widget.template.label).toBeUndefined();
            });

            it('should have the leftIcon property undefined', function() {
                expect(widget.template.leftIcon).toBeUndefined();
            });

            it('should have the rightIcon property undefined', function() {
                expect(widget.template.rightIcon).toBeUndefined();
            });

            it('should have the iconButton property undefined', function() {
                expect(widget.template.iconButton).toBeUndefined();
            });

        });

        describe('with automatic values', function() {

            beforeEach(function() {
                mockAutomaticTemplateConfig();
                widget = factory.create({}, Mock.templateConfig, Mock.element, {});
            });

            it('should have the ariaLabel equal to label if not defined', function() {
                expect(widget.template.ariaLabel).toBe(Mock.templateConfig.label);
            });

            it('should have the leftIcon property defined if iconButton is defined', function() {
                expect(widget.template.leftIcon).toBe(Mock.templateConfig.iconButton);
            });

        });

        describe('with corrected values', function() {

        });

        describe('flag properties', function() {

            describe('hasLeftIcon', function() {

                it('should be equal to true when leftIcon is defined', function() {
                    Mock.templateConfig = {
                        leftIcon: 'leftIconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, Mock.element, {});

                    expect(widget.template.hasLeftIcon).toBe(true);
                });

                it('should be equal to true when iconButton is defined', function() {
                    Mock.templateConfig = {
                        iconButton: 'iconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, Mock.element, {});

                    expect(widget.template.hasLeftIcon).toBe(true);
                });

                it('should be equal to false when leftIcon and iconButton are undefined', function() {
                    widget = factory.create({}, {}, Mock.element, {});

                    expect(widget.template.hasLeftIcon).toBe(false);
                });

            });

            describe('hasRightIcon', function() {

                it('should be equal to true when rightIcon is defined and iconButton is undefined', function() {
                    Mock.templateConfig = {
                        rightIcon: 'rightIconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, Mock.element, {});

                    expect(widget.template.hasRightIcon).toBe(true);
                });

                it('should be equal to false when rightIcon is defined and iconButton is defined', function() {
                    Mock.templateConfig = {
                        rightIcon: 'rightIconName',
                        iconButton: 'rightIconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, Mock.element, {});

                    expect(widget.template.hasRightIcon).toBe(false);
                });

                it('should be equal to false when iconButton is defined', function() {
                    Mock.templateConfig = {
                        iconButton: 'iconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, Mock.element, {});

                    expect(widget.template.hasRightIcon).toBe(false);
                });

                it('should be equal to false when rightIcon is undefined', function() {
                    widget = factory.create({}, {}, Mock.element, {});

                    expect(widget.template.hasRightIcon).toBe(false);
                });

            });

        });

    });

    describe('parent widget', function() {

        it('should be undefined when no parent is assigned', function() {
            widget = factory.create({}, {}, Mock.element);

            expect(widget.parent).toBeUndefined();
        });

        it('should hold a reference to parent widget assigned', function() {
            mockParentWidget();
            widget = factory.create({}, {}, Mock.element, Mock.parentWidget);

            expect(widget.parent).toBeDefined();
            expect(widget.parent.className).toBe(Mock.parentWidget.className);
        });

    });

    function mockFullTemplateConfig() {
        Mock.templateConfig = {
            ariaLabel: 'Text for arial label.',
            label: 'Text for label.',
            leftIcon: 'leftIconName',
            rightIcon: 'rightIconName'
        };
    }

    function mockAutomaticTemplateConfig() {
        Mock.templateConfig = {
            label: 'Text for label.'
        };
    }

    function mockParentWidget() {
        Mock.parentWidget = {
            className: 'ParentWidget'
        };
    }

    function mockTemplateData() {
        Mock.templateData = {
            model: function clientFunction() {
                return 'a value';
            }
        };
    }

    function mockElement() {
        Mock.element = {
            on: function on(eventName, callback) {
                callback();
            }
        };
    }

});
