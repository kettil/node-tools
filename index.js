'use strict';
var os     = require('os');
var path   = require('path');
var crypto = require('crypto');
var _      = require('underscore');
var tools  = module.exports = {};


// ##########################
// # Path


tools.root = function() {
    var pathRoot = __dirname.split('/node_modules/').shift();
    if (arguments.length === 0) {
        return pathRoot;
    }
    // converts "arguments" in an array ...
    var args = [].slice.call(arguments);
    // ... and prepends the root directory.
    args.unshift(pathRoot);
    // join all arguments together and normalize the resulting path
    return path.join.apply(path, args);
};


// ##########################
// # Crypto


tools.hash = function(value, encoding, algorithm) {
    if (!_.isString(value)) {
        value = [
            Math.random(),
            Date.now(),
            os.hostname(),
            os.uptime(),
            process.uptime()
        ].join('#');
    }
    return crypto.createHash(algorithm || 'sha1').update(value).digest(encoding || 'hex');
};


// ##########################
// # Object


var defaults = tools.defaults = function(object, defaultObject) {
    var depth  = {};
    _.each(object, function(value, key) {
        if (_.has(defaultObject, key) && !_.isFunction(value) && !_.isArray(value) && _.isObject(value)) {
            depth[key] = defaults(value, defaultObject[key]);
        }
    });
    _.each(defaultObject, function(value, key) {
        if (!_.has(object, key) && !_.isFunction(value)) {
            if (_.isObject(value) && !_.isArray(value)) {
                depth[key] = defaults({}, value);
            } else if (_.isArray(value)) {
                depth[key] = [].concat(value);
            }
        }
    });
    return _.defaults(depth, object, defaultObject);
};

tools.get = function(options, key) {
    var path = [];
    if (!_.isString(key)) {
        throw new Error('Key is not a string [type: "' + (typeof key) + '"]');
    }
    if (!_.isObject(options)) {
        throw new Error('Options is not a object [type: "' + (typeof options) + '"]');
    }
    if (key.length === 0) {
        return options;
    }
    _.each(key.split('.'), function(v) {
        if (!_.isObject(options)) {
            throw new Error(
                'Options with the key "' + path.join('.') + '" is not a object [key: "' + key + '"]'
            );
        }
        path.push(v);
        if (!_.has(options, v)) {
            throw new Error('Options with the key "' + path.join('.') + '" is not defined [key: "' + key + '"]');
        }
        options = options[v];
    });
    return options;
};

tools.removedUndefined = function(object) {
    var keys = [];
    _.each(object, function(value, key) {
        if (_.isUndefined(value)) {
            keys.push(key);
        }
    });
    return _.omit(object, keys);
};










