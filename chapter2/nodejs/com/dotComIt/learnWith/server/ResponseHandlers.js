/**
 * Created by jhouser on 6/3/2016.
 */

var handlers = {};

var indexService = require("./../services/IndexService");
var authenticationService = require("./../services/AuthenticationService");

handlers["/index.html"] = indexService.execute;
handlers["/login"] = authenticationService.login;

exports.handlers = handlers;