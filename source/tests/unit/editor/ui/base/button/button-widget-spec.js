xdescribe('OtusButtonWidget', function() {
    var factory;
    var widget;
    var Mock = {};

    beforeEach(function() {
        angular.mock.module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('OtusButtonWidgetFactory');
        });
    });

    describe('template configuration', function() {

        describe('with full configuration', function() {

            beforeEach(function() {
                mockFullTemplateConfig();
                widget = factory.create({}, Mock.templateConfig, {});
            });

            it('should have the ariaLabel property defined', function() {
                expect(widget.template.ariaLabel).toBeDefined();
            });

            it('should have the label property defined', function() {
                expect(widget.template.label).toBeDefined();
            });

            it('should have the tooltip property defined', function() {
                expect(widget.template.tooltip).toBeDefined();
            });

            it('should have the tooltipDirection property defined', function() {
                expect(widget.template.tooltipDirection).toBeDefined();
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
                widget = factory.create({}, {}, {});
            });

            it('should have the ariaLabel property undefined', function() {
                expect(widget.template.ariaLabel).toBeUndefined();
            });

            it('should have the label property undefined', function() {
                expect(widget.template.label).toBeUndefined();
            });

            it('should have the tooltip property undefined', function() {
                expect(widget.template.tooltip).toBeUndefined();
            });

            it('should have the tooltipDirection property equal to top', function() {
                expect(widget.template.tooltipDirection).toBe('top');
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
                widget = factory.create({}, Mock.templateConfig, {});
            });

            it('should have the ariaLabel equal to label if not defined', function() {
                expect(widget.template.ariaLabel).toBe(Mock.templateConfig.label);
            });

            it('should have the tooltip equal to label if not defined', function() {
                expect(widget.template.tooltip).toBe(Mock.templateConfig.label);
            });

            it('should have the leftIcon property defined if iconButton is defined', function() {
                expect(widget.template.leftIcon).toBe(Mock.templateConfig.iconButton);
            });

        });

        describe('with corrected values', function() {

            describe('tooltip', function() {

                beforeEach(function() {
                    mockInvalidTemplateConfig();
                    widget = factory.create({}, Mock.templateConfig, {});
                });

                it('should have the tooltipDirection property equal to top if config is not in [top, bottom, left, right] values', function() {
                    expect(widget.template.tooltipDirection).toBe('top');
                });

                it('widget should not correct value fo tooltipDirection if is equal to top', function() {
                    Mock.templateConfig = {
                        tooltipDirection: 'top'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.tooltipDirection).toBe('top');
                });

                it('widget should not correct value fo tooltipDirection if is equal to bottom', function() {
                    Mock.templateConfig = {
                        tooltipDirection: 'bottom'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.tooltipDirection).toBe('bottom');
                });

                it('widget should not correct value fo tooltipDirection if is equal to left', function() {
                    Mock.templateConfig = {
                        tooltipDirection: 'left'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.tooltipDirection).toBe('left');
                });

                it('widget should not correct value fo tooltipDirection if is equal to right', function() {
                    Mock.templateConfig = {
                        tooltipDirection: 'right'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.tooltipDirection).toBe('right');
                });

            });

        });

        describe('flag properties', function() {

            describe('hasLeftIcon', function() {

                it('should be equal to true when leftIcon is defined', function() {
                    Mock.templateConfig = {
                        leftIcon: 'leftIconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.hasLeftIcon).toBe(true);
                });

                it('should be equal to true when iconButton is defined', function() {
                    Mock.templateConfig = {
                        iconButton: 'iconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.hasLeftIcon).toBe(true);
                });

                it('should be equal to false when leftIcon and iconButton are undefined', function() {
                    widget = factory.create({}, {}, {});

                    expect(widget.template.hasLeftIcon).toBe(false);
                });

            });

            describe('hasRightIcon', function() {

                it('should be equal to true when rightIcon is defined and iconButton is undefined', function() {
                    Mock.templateConfig = {
                        rightIcon: 'rightIconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.hasRightIcon).toBe(true);
                });

                it('should be equal to false when rightIcon is defined and iconButton is defined', function() {
                    Mock.templateConfig = {
                        rightIcon: 'rightIconName',
                        iconButton: 'rightIconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.hasRightIcon).toBe(false);
                });

                it('should be equal to false when iconButton is defined', function() {
                    Mock.templateConfig = {
                        iconButton: 'iconName'
                    };
                    widget = factory.create({}, Mock.templateConfig, {});

                    expect(widget.template.hasRightIcon).toBe(false);
                });

                it('should be equal to false when rightIcon is undefined', function() {
                    widget = factory.create({}, {}, {});

                    expect(widget.template.hasRightIcon).toBe(false);
                });

            });

        });

    });

    describe('parent widget', function() {

        it('should be undefined when no parent is assigned', function() {
            widget = factory.create({}, {});

            expect(widget.parent).toBeUndefined();
        });

        it('should hold a reference to parent widget assigned', function() {
            mockParentWidget();
            widget = factory.create({}, {}, Mock.parentWidget);

            expect(widget.parent).toBeDefined();
            expect(widget.parent.className).toBe(Mock.parentWidget.className);
        });

    });

    describe('css configuration', function() {

        it('should have the iconButton like an empty string when templateConfig.iconButton is undefined', function() {
            widget = factory.create({}, {}, {});
            expect(widget.css.iconButton).toBe('');
        });

        it('should have the iconButton like an empty string when templateConfig.iconButton is undefined', function() {
            widget = factory.create({}, {
                iconButton: 'iconButton'
            }, {});

            expect(widget.css.iconButton).toBe('md-icon-button');
        });

    });

    describe('events configuration', function() {

        beforeEach(function() {
            mockTemplateData();
            widget = factory.create(Mock.templateData, {}, {});
        });

        it('should have a click property defined as Function', function() {
            expect(widget.event.click).toBeDefined();
            expect(widget.event.click instanceof Function).toEqual(true);
        });

        describe('click event', function() {

            beforeEach(function() {
                mockTemplateData();
                widget = factory.create(Mock.templateData, {}, {});
            });

            it('should call the client function', function() {
                expect(widget.event.click()).toEqual('a value');
            });

        });

    });


    function mockFullTemplateConfig() {
        Mock.templateConfig = {
            ariaLabel: 'Text for arial label.',
            label: 'Text for label.',
            tooltip: 'Text for tooltip.',
            tooltipDirection: 'bottom',
            leftIcon: 'leftIconName',
            rightIcon: 'rightIconName'
        };
    }

    function mockAutomaticTemplateConfig() {
        Mock.templateConfig = {
            label: 'Text for label.',
            iconButton: 'iconName'
        };
    }

    function mockInvalidTemplateConfig() {
        Mock.templateConfig = {
            tooltipDirection: 'angular',
        };
    }

    function mockParentWidget() {
        Mock.parentWidget = {
            className: 'ParentWidget'
        };
    }

    function mockTemplateData() {
        Mock.templateData = {
            click: function clientFunction() {
                return 'a value';
            }
        };
    }

});
