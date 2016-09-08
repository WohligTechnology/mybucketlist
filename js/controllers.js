angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ksSwiper'])

.controller('ComingSoonCtrl', function($scope, TemplateService, NavigationService, $timeout, $http) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("coming-soon");
    $scope.menutitle = NavigationService.makeactive("Coming Soon");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    TemplateService.header = "";
    TemplateService.footer = "";
    TemplateService.slider = "";
    $scope.showModal = false;

    $scope.typeOptions = [{
        name: 'Age*',
        value: ''
    }, {
        name: 'Less than 29 years',
        value: 'Less_than_29_years'
    }, {
        name: 'Between 30 to 49 years',
        value: 'Between_30_to_49_years'
    }, {
        name: 'Between 50 to 69 years',
        value: 'Between_50_to_69_years'
    }, {
        name: 'More than 70 years',
        value: 'More_than_70_years'
    }];

    $scope.form = {
        age: $scope.typeOptions[0].value,
        email: ''
    };

    $scope.sendEmail = function(data, formValidate) {
        if ((data.age !== '' && data.age !== null && data.age !== undefined)  && (data.email !== '' && data.email !== null && data.email !== undefined)) {
          console.log("here");
            $http({
                method: 'GET',
                url: 'mail.php?email=' + data.email + "&age=" + data.age,
            }).success(function(data) {
                if (data.value === true) {
                    console.log("Email sent");
                    $scope.showModal = true;
                } else {
                    console.log("Error Sending Email");
                }
            });
        } else {
            if (data.age === '' || data.age === null || data.age === undefined) {
                formValidate.age.$touched = true;
            }
            if (data.email === '' || data.email === null || data.email === undefined) {
                formValidate.email.$touched = true;
            }
        }
    };

})

.controller('headerctrl', function($scope, TemplateService) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $.fancybox.close(true);
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
        console.log("Language Clicked");

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };


});
