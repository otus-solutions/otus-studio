describe('NavigationBuilderService Suite', function () {

  var EXPECTED_EDGES = 6;
  var EXPECTED_ID_EDGE = "OS23_OS24";
  var EXPECTED_NODES = 6;
  var EXPECTED_ID_NODE = "OS22";

  var service, ids;
  var Mock = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('studio', function ($provide) {
      // $provide.value('WorkspaceService');
    });

    angular.mock.inject(function (_$injector_) {
      Injections.NavigationBuilderScopeService = _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderScopeService');
      Injections.MapFactory = _$injector_.get('otusjs.studio.navigationBuilder.MapFactory');
      Injections.RouteBuilderService = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService');
      Injections.NavigationInspectorService = _$injector_.get('otusjs.studio.navigationBuilder.navigationInspector.NavigationInspectorService');
      Injections.NavigationRoutePriorityService = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.NavigationRoutePriorityService');

      service = _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderService', Injections);

      //preparation of the survey via factory by passing context json
      Injections.SurveyLoaderService = _$injector_.get('SurveyLoaderService');
      Mock.survey = Injections.SurveyLoaderService.loadSurvey(Mock.surveyJson);
      Mock.state = true;

      spyOn(Mock.survey.NavigationManager, "getNavigationList").and.callThrough();
      spyOn(Injections.RouteBuilderService, "activate").and.callThrough();
      spyOn(Injections.NavigationInspectorService, "activate").and.callThrough();
      spyOn(Injections.NavigationRoutePriorityService, "activate").and.callThrough();
      spyOn(Injections.NavigationInspectorService, "deactivate");
      spyOn(Injections.MapFactory, "create").and.callThrough();

      service.setSurvey(Mock.survey);
    });
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodExistence check', function () {
    expect(service.nodes).toBeDefined();
    expect(service.edges).toBeDefined();
    expect(service.setSurvey).toBeDefined();
    expect(service.activateRouteCreatorMode).toBeDefined();
    expect(service.editRoutePriorityState).toBeDefined();
    expect(service.activateNavigationInspectorMode).toBeDefined();
    expect(service.deactiveMode).toBeDefined();
    expect(service.reloadMapData).toBeDefined();
  });

  it('_setSurvey_method_should_ evoke_getNavigationsList_in_parameterPath_of_loadTemplateNavigation_internalMethod', function () {
    expect(Mock.survey.NavigationManager.getNavigationList).toHaveBeenCalledTimes(1);
  });

  it('edge_method_should_return_length_of_arrayEdges', function () {
    var _edges = service.edges();
    expect(EXPECTED_EDGES).toBe(service.edges().length);
    expect(EXPECTED_ID_EDGE).toBe(_edges[4].id);
  });

  it('nodes_should_return_length_of_arrayNodes', function () {
    var _nodes = service.nodes(ids);
    expect(EXPECTED_NODES).toBe(service.edges().length);
    expect(EXPECTED_ID_NODE).toBe(_nodes[3].id);
  });

  it('activateRouteCreatorMode_method_should_evoke_activate_of_activeServiceMode_internalMethod ', function () {
    service.activateRouteCreatorMode();
    expect(Injections.RouteBuilderService.activate).toHaveBeenCalledTimes(1);
  });

  it('activateNavigationInspectorMode_method_should_evoke_activate_of_activeServiceMode_internalMethod ', function () {

    service.activateNavigationInspectorMode(Mock.state);
    expect(Injections.NavigationInspectorService.activate).toHaveBeenCalledTimes(1);
  });

  it('editRoutePriorityState_method_should_evoke_activate_of_activeServiceMode_internalMethod ', function () {
    service.editRoutePriorityState(Mock.state);
    expect(Injections.NavigationRoutePriorityService.activate).toHaveBeenCalledTimes(1);
  });

  it('deactiveMode_method_should_evoke_deactivate_for_the_service_that_was_activated', function () {
    service.activateNavigationInspectorMode(Mock.state);
    service.deactiveMode();
    expect(Injections.NavigationInspectorService.deactivate).toHaveBeenCalledTimes(1);
  });

  it('reloadMapData_should ', function () {
    service.reloadMapData();
    expect(Injections.MapFactory.create).toHaveBeenCalledTimes(2);
  });


  Mock.surveyJson = {
    "extents": "StudioObject",
    "objectType": "Survey",
    "oid": "dXNlclVVSUQ6W3VuZGVmaW5lZF1zdXJ2ZXlVVUlEOls3MjA2MGM0MC01MjQ5LTExZTktODIxYi0yOTc1MzE5NTcyMGJdcmVwb3NpdG9yeVVVSUQ6WyBOb3QgZG9uZSB5ZXQgXQ==",
    "identity": {
      "extents": "StudioObject",
      "objectType": "SurveyIdentity",
      "name": "feature-OS-2",
      "acronym": "OS2",
      "recommendedTo": "",
      "description": "",
      "keywords": []
    },
    "metainfo": {
      "extents": "StudioObject",
      "objectType": "SurveyMetaInfo",
      "creationDatetime": "2019-03-29T17:38:21.060Z",
      "otusStudioVersion": ""
    },
    "dataSources": [],
    "itemContainer": [
      {
        "extents": "SurveyItem",
        "objectType": "CalendarQuestion",
        "templateID": "OS21",
        "customID": "OS21",
        "dataType": "LocalDate",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": []
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "canBeIgnored": false,
                "reference": true
              }
            }
          }
        }
      },
      {
        "extents": "SurveyItem",
        "objectType": "IntegerQuestion",
        "templateID": "OS22",
        "customID": "OS22",
        "dataType": "Integer",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": []
        },
        "unit": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "canBeIgnored": false,
                "reference": true
              }
            }
          }
        }
      },
      {
        "extents": "SurveyItem",
        "objectType": "DecimalQuestion",
        "templateID": "OS23",
        "customID": "OS23",
        "dataType": "Decimal",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": []
        },
        "unit": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "canBeIgnored": false,
                "reference": true
              }
            }
          }
        }
      },
      {
        "extents": "SurveyItem",
        "objectType": "SingleSelectionQuestion",
        "templateID": "OS24",
        "customID": "OS24",
        "dataType": "Integer",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "options": [],
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": []
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "canBeIgnored": false,
                "reference": true
              }
            }
          }
        }
      }
    ],
    "navigationList": [
      {
        "extents": "SurveyTemplateObject",
        "objectType": "Navigation",
        "origin": "BEGIN NODE",
        "index": 0,
        "inNavigations": [],
        "routes": [
          {
            "extents": "SurveyTemplateObject",
            "objectType": "Route",
            "origin": "BEGIN NODE",
            "destination": "OS21",
            "name": "BEGIN NODE_OS21",
            "isDefault": true,
            "conditions": []
          }
        ]
      },
      {
        "extents": "SurveyTemplateObject",
        "objectType": "Navigation",
        "origin": "END NODE",
        "index": 1,
        "inNavigations": [
          {
            "origin": "OS24",
            "index": 5
          }
        ],
        "routes": []
      },
      {
        "extents": "SurveyTemplateObject",
        "objectType": "Navigation",
        "origin": "OS21",
        "index": 2,
        "inNavigations": [
          {
            "origin": "BEGIN NODE",
            "index": 0
          }
        ],
        "routes": [
          {
            "extents": "SurveyTemplateObject",
            "objectType": "Route",
            "origin": "OS21",
            "destination": "OS23",
            "name": "OS21_OS23",
            "isDefault": true,
            "conditions": []
          },
          {
            "extents": "SurveyTemplateObject",
            "objectType": "Route",
            "origin": "OS21",
            "destination": "OS22",
            "name": "OS21_OS22",
            "isDefault": false,
            "conditions": [
              {
                "extents": "StudioObject",
                "objectType": "RouteCondition",
                "name": "ROUTE_CONDITION_0",
                "rules": [
                  {
                    "extents": "SurveyTemplateObject",
                    "objectType": "Rule",
                    "when": "OS21",
                    "operator": "equal",
                    "answer": "1",
                    "isMetadata": false,
                    "isCustom": true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "extents": "SurveyTemplateObject",
        "objectType": "Navigation",
        "origin": "OS22",
        "index": 3,
        "inNavigations": [
          {
            "origin": "OS21",
            "index": 2
          }
        ],
        "routes": [
          {
            "extents": "SurveyTemplateObject",
            "objectType": "Route",
            "origin": "OS22",
            "destination": "OS23",
            "name": "OS22_OS23",
            "isDefault": true,
            "conditions": []
          }
        ]
      },
      {
        "extents": "SurveyTemplateObject",
        "objectType": "Navigation",
        "origin": "OS23",
        "index": 4,
        "inNavigations": [
          {
            "origin": "OS22",
            "index": 3
          },
          {
            "origin": "OS21",
            "index": 2
          }
        ],
        "routes": [
          {
            "extents": "SurveyTemplateObject",
            "objectType": "Route",
            "origin": "OS23",
            "destination": "OS24",
            "name": "OS23_OS24",
            "isDefault": true,
            "conditions": []
          }
        ]
      },
      {
        "extents": "SurveyTemplateObject",
        "objectType": "Navigation",
        "origin": "OS24",
        "index": 5,
        "inNavigations": [
          {
            "origin": "OS23",
            "index": 4
          }
        ],
        "routes": [
          {
            "extents": "SurveyTemplateObject",
            "objectType": "Route",
            "origin": "OS24",
            "destination": "END NODE",
            "name": "OS24_END NODE",
            "isDefault": true,
            "conditions": []
          }
        ]
      }
    ]
  };
});
