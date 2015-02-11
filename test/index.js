'use strict';
var assert = require('assertthat');
var crypto = require('crypto');
var tools  = require(__dirname + '/../index');

describe('root()', function () {

    it('- test without arguments => ok', function () {
        var actual = tools.root();
        assert.that(actual, is.equalTo(
            __dirname.substr(0, __dirname.length - 5)
        ));
    });
    it('- test with one argument => ok', function () {
        var actual = tools.root('./dir_1');
        assert.that(actual, is.equalTo(
            __dirname.substr(0, __dirname.length - 5) + '/dir_1'
        ));
    });
    it('- test with two arguments => ok', function () {
        var actual = tools.root('/dir1', 'dir2/dir3');
        assert.that(actual, is.equalTo(
            __dirname.substr(0, __dirname.length - 5) + '/dir1/dir2/dir3'
        ));
    });
    it('- test with three arguments => ok', function () {
        var actual = tools.root('/dir1', '..', 'dir3');
        assert.that(actual, is.equalTo(
            __dirname.substr(0, __dirname.length - 5) + '/dir3'
        ));
    });

});

describe('hash()', function () {

    it('- test without arguments => ok', function () {
        var actual = tools.hash();
        assert.that(actual.length, is.equalTo(40));
        assert.that(actual, is.not.equalTo(''));
    });

    it('- test with sha1 and hex => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value);
        assert.that(actual.length, is.equalTo(40));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha1').update(value).digest('hex')
        ));
    });
    it('- test with sha1 and binary => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value, 'binary');
        assert.that(actual.length, is.equalTo(20));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha1').update(value).digest('binary')
        ));
    });
    it('- test with sha1 and base64 => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value, 'base64');
        assert.that(actual.length, is.equalTo(28));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha1').update(value).digest('base64')
        ));
    });

    it('- test with sha256 and hex => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value, undefined, 'sha256');
        assert.that(actual.length, is.equalTo(64));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha256').update(value).digest('hex')
        ));
    });
    it('- test with sha256 and binary => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value, 'binary', 'sha256');
        assert.that(actual.length, is.equalTo(32));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha256').update(value).digest('binary')
        ));
    });
    it('- test with sha256 and base64 => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value, 'base64', 'sha256');
        assert.that(actual.length, is.equalTo(44));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha256').update(value).digest('base64')
        ));
    });

    it('- test with sha512 and hex => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value, undefined, 'sha512');
        assert.that(actual.length, is.equalTo(128));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha512').update(value).digest('hex')
        ));
    });
    it('- test with sha512 and binary => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value, 'binary', 'sha512');
        assert.that(actual.length, is.equalTo(64));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha512').update(value).digest('binary')
        ));
    });
    it('- test with sha512 and base64 => ok', function () {
        var value  = 'test-string';
        var actual = tools.hash(value, 'base64', 'sha512');
        assert.that(actual.length, is.equalTo(88));
        assert.that(actual, is.equalTo(
            crypto.createHash('sha512').update(value).digest('base64')
        ));
    });

});

describe('defaults()', function () {

    it('- merging two objects with a depth of one, part 1 => ok', function () {
        var actual = tools.defaults({ a: 1 }, { a: 2, b: 3 });
        assert.that(actual, is.equalTo({ a: 1, b: 3 }));
    });
    it('- merging two objects with a depth of one, part 2 => ok', function () {
        var func   = function() { return 'a'; };
        var actual = tools.defaults({ a: func }, { a: 2, c: [] });
        assert.that(actual, is.equalTo({ a: func, c: [] }));
    });

    it('- merging two objects with a depth of two, part 1 => ok', function () {
        var actual = tools.defaults({ a: 1, d: { t: 10 } }, { a: 2, d: { t: 1, a: 9 } });
        assert.that(actual, is.equalTo({ a: 1, d: { t: 10, a: 9 } }));
    });
    it('- merging two objects with a depth of two, part 2 => ok', function () {
        var func   = function() { return 'a'; };
        var actual = tools.defaults({ d: { t: 10 } }, { a: 2, d: { t: 1, a: func } });
        assert.that(actual, is.equalTo({ a: 2, d: { t: 10, a: func } }));
    });

    it('- merging two objects with a depth of three, part 1 => ok', function () {
        var actual = tools.defaults({ a: 1, d: { t: { a: 'test'} } }, { a: 2, d: { t: 1, a: { p: [1,2,3,4]} } });
        assert.that(actual, is.equalTo({ a: 1, d: { t: { a: 'test'}, a: { p: [1,2,3,4]} } }));
    });
    it('- merging two objects with a depth of three, part 2 => ok', function () {
        var actual = tools.defaults({ a: 1 }, { a: 2, d: { t: 1, a: { p: 'test'} } });
        assert.that(actual, is.equalTo({ a: 1, d: { t: 1, a: { p: 'test'} } }));
    });

});

describe('removedUndefined()', function () {

    it('- test for removal of undefined entries, part 1 => ok', function () {
        var actual = tools.removedUndefined({ a: 1, b: 2, c: undefined, d: 'test', e: {} });
        assert.that(actual, is.equalTo({ a: 1, b: 2, d: 'test', e: {} }));
    });
    it('- test for removal of undefined entries, part 2 => ok', function () {
        var actual = tools.removedUndefined({ 1: true, 2: undefined, 3: false, 4: null, 5: [] });
        assert.that(actual, is.equalTo({ 1: true, 3: false, 4: null, 5: [] }));
    });

});

