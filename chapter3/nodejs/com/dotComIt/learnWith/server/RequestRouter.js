/**
 * Created by jhouser on 6/3/2016.
 */

function route(handlers, pathname, response, queryString) {
    if (typeof handlers[pathname] === 'function') {
        handlers[pathname](response, queryString);
    }
    else {
        response.writeHeader(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
