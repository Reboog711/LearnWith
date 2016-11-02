/**
 * Created by jhouser on 6/3/2016.
 */

var http = require('http');

var url = require("url");


function start(route, handlers){
    http.createServer(function (request, response) {
        // other code here
        var url_parts = url.parse(request.url,true);
        var pathname = url_parts.pathname;
        console.log("Request for " + pathname + " received.");
        var queryString = url_parts.query;

        route(handlers, pathname, response, queryString);

    }).listen(8080);
    console.log('Server running at http://127.0.0.1:8080/');

}

exports.start = start;