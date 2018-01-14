var app = angular.module("umbraco");

app.directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
});

app.controller("my.grideditorcontroller.table", function ($scope) {
    document.getElementById("tablegrid-controller").parentElement.parentElement.parentElement.style.overflow = "visible";

    $scope.contextMenu = [];

    if ($scope.control.rows === undefined) {
        $scope.control.rows = 1;
    }

    if ($scope.control.colls === undefined) {
        $scope.control.colls = 1;
    }

    if ($scope.control.cells === undefined) {
        $scope.control.cells = [];

        for (var i = 0; i < 4; i++) {
            $scope.control.cells.push('');
            $scope.contextMenu.push(false);
        }
    }
    else {
        for (var i = $scope.control.cells.length; i--;) {
            $scope.contextMenu.push(false);
        }
    }

    $scope.toggleContextmenu = function (cellIndex) {
        for (var i = $scope.contextMenu.length; i >= 0; i--) {

            if (i === cellIndex) {
                $scope.contextMenu[i] = !$scope.contextMenu[i];
            }
            else {
                $scope.contextMenu[i] = false;
            }
        }
        console.log($scope.contextMenu);
    };

    $scope.removeRow = function (rowIndex) {

    };

    $scope.addRow = function (location) {
        $scope.control.rows += 1;
    
        var newArray = [],
            rowCounter = 0;
        
        for (var i = 0; i < $scope.control.cells.length; i++) {

            newArray.push($scope.control.cells[i]);

            if (i % $scope.control.rows === location - 1 && rowCounter++ === location) {
       
                for (var ci = 0; ci <= $scope.control.colls; ci++) {
                    newArray.push('');
                }
            }
        }

        $scope.control.cells = newArray;
        $scope.toggleContextmenu(-1);
    };

    $scope.removeColl = function (collIndex) {

    };

    $scope.addColl = function (location) {
        $scope.control.colls += 1;

        var newArray = [];

        for (var i = 0; i < $scope.control.cells.length; i++) {

            newArray.push($scope.control.cells[i]);

            if (i % $scope.control.colls === location - 1) {
                newArray.push('');
            }
        }

        $scope.control.cells = newArray;
        $scope.toggleContextmenu(-1);
    };

    $scope.updateCell = function (that, cellIndex) {
        $scope.control.cells[cellIndex].value = that.val;
    };

    $scope.range = function (min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
});
