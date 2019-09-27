describe('SurveyItemGroupDialogController_UnitTests_Suite', function () {
  var ctrl;
  var Injections = [];

   beforeEach(function () {
     angular.mock.module('editor.ui');
     angular.mock.inject(function ($injector,$controller) {
       Injections.data = loadData();
       ctrl = $controller('SurveyItemGroupDialogController', Injections);
     })
   });

  it('controllerExistence check ', function () {
    expect(ctrl).toBeDefined();
  });

  it('test_should_check_if_the_parameters_sent_by_injection_were_loaded_into_ctrl_attributes', function () {
    expect(ctrl.item).toBe('scaledItemGroup');
    expect(ctrl.cancelGroupEdit).toBe("_cancelGroupEdit");
    expect(ctrl.deleteGroup).toBe( "_deleteGroup");
    expect(ctrl.buttons[0].message).toBe('StateValues.EDITOR_GROUP_CANCEL_BUTTON');
    expect(ctrl.buttons[1].message).toBe('StateValues.EDITOR_GROUP_SAVE_BUTTON');
  });
});

function loadData() {
  return {
    item: "scaledItemGroup",
    cancelGroupEdit: "_cancelGroupEdit",
    deleteGroup: "_deleteGroup",
    buttons: [
      {
        message: "StateValues.EDITOR_GROUP_CANCEL_BUTTON",
        action: "_cancelGroupEdit"
      },
      {
        message: "StateValues.EDITOR_GROUP_SAVE_BUTTON",
        action: "_saveSurveyGroup"
      }
    ]
  };
}
