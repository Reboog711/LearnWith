/**
 * Created by jhouser on 6/3/2016.
 */

var handlers = {};

var indexService = require("./../services/IndexService");

handlers["/index.html"] = indexService.execute;

exports.handlers = handlers;