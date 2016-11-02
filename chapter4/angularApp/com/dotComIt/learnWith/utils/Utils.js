/**
 * Created by jhouser on 5/12/2016.
 */

angular.module('learnWith').service('SharedUtils', ['$filter',function($filter){

    var utils = {
        objToJSONString : objToJSONString
    }
    return utils;

    function objToJSONString (obj) {
        var str = '';
        for (var p in obj) {
            if(obj[p] instanceof  Date){
                str += "\"" + p + "\":\"" + $filter('date')(obj[p],'MM/dd/yyyy') + "\",";
            } else {
                str += "\"" + p + "\":\"" + obj[p] + "\",";
            }
        }
        if(str.length > 0){
            str = str.substr(0,str.length-1)
        }

        return '{' + str + '}';
    }
}]);


