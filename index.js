
var Batch = require('batch');
var component = require('component');
var each = require('each-component');
var extend = require('extend');
var outdated = require('component-outdated');


/**
 * Expose `udpate`.
 */

module.exports = update;


/**
 * Get the dependencies to update from `json`.
 *
 * @param {Object} json
 * @param {Object} options (optional)
 * @param {Function} callback
 */

function update (json, options, callback) {
  if ('function' == typeof options) {
    callback = options;
    options = {};
  }

  options = options || {};

  outdated(json, function (err, deps) {
    if (err) return callback(err);
    if (!options.pin) return callback(null, deps);
    pinned(json, function (err, pins) {
      if (err) return callback(err);
      callback(null, extend(deps, pins));
    });
  });
}


/**
 * Return the pinned versions of unpinned `deps`.
 *
 * @param {Object} deps
 * @param {Function} callback
 */

function pinned (json, callback) {
  var batch = new Batch();
  var deps = json.dependencies || {};

  each(deps, function (repo, version) {
    if (version !== '*') return;
    batch.push(function (done) {
      component.info(repo, 'master', function (err, pkg) {
        if (err) return done(err);
        done(null, {
          repo: repo,
          local: version,
          remote: pkg.version
        });
      });
    });
  });

  batch.end(function (err, res) {
    if (err) return callback(err);
    callback(null, toObject(res));
  });
}



/**
 * Turn the result into an object.
 *
 * @param {Array} result
 * @return {Object}
 */

function toObject (result) {
  var ret = {};
  result.forEach(function (obj) {
    ret[obj.repo] = {
      local: obj.local,
      remote: obj.remote
    };
  });
  return ret;
}