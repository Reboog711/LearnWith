/**
 * Created by jhouser on 6/3/2016.
 */

var handlers = {};

var indexService = require("./../services/IndexService");
var authenticationService = require("./../services/AuthenticationService");
var taskService = require("./../services/TaskService");

handlers["/index.html"] = indexService.execute;
handlers["/login"] = authenticationService.login;
handlers["/taskService/getFilteredTasks"] = taskService.getFilteredTasks;

exports.handlers = handlers;