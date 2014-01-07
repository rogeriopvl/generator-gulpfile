/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('gulpfile generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('gulpfile:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected browser app files with package.json', function (done) {
        var expected = [ 'Gulpfile.js', 'package.json' ];

        helpers.mockPrompt(this.app, {
            'createPkgFile': true,
            'appType': 'browser'
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected, /gulp-livereload/);
            done();
        });
    });

    it('creates expected node app files with package.json', function (done) {
        var expected = [ 'Gulpfile.js', 'package.json' ];

        helpers.mockPrompt(this.app, {
            'createPkgFile': true,
            'appType': 'browser'
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected, /gulp-mocha/);
            done();
        });
    });

    it('creates expected node app files without package.json', function (done) {
        var expected = [ 'Gulpfile.js' ];

        helpers.mockPrompt(this.app, {
            'createPkgFile': false,
            'appType': 'node'
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected, /gulp-mocha/);
            done();
        });
    });

    it('creates expected browser app files without package.json', function (done) {
        var expected = [ 'Gulpfile.js' ];

        helpers.mockPrompt(this.app, {
            'createPkgFile': false,
            'appType': 'browser'
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected, /gulp-livereload/);
            done();
        });
    });
});
