var assert = require('chai').assert;
var DFAGenerator = require('../src/dfa.js').DFAGenerator;

describe('Array', function() {
    describe('All strings which has even number of zeros', function () {
        var lang = {
            states: ["a","b"],
            transitionFun:{
                a:{
                    0:'b',
                    1:'a'
                },
                b:{
                    0:'a',
                    1:'b'
                }
            } ,
            initialState:"a" ,
            finalStates:['a']
        };

        var evenNoOfZeroDFA = DFAGenerator(lang);

        it('DFA for string 00', function () {
            assert.isTrue(evenNoOfZeroDFA('00'))
        });

        it('DFA for string 0111', function () {
            assert.isFalse(evenNoOfZeroDFA('0111'))
        });

        it('DFA for string 000', function () {
            assert.isFalse(evenNoOfZeroDFA('000'))
        });

        it('DFA for string 00111010', function () {
            assert.isTrue(evenNoOfZeroDFA('00111010'))
        });
    });

    describe('All strings that begin with 1 and contain the string 001', function () {
        var lang = {
            states: ["a","b","c","d","e","f"],
            transitionFun:{
                a:{
                    0:'f',
                    1:'b'
                },
                b:{
                    0:'c',
                    1:'f'
                },
                c:{
                    0:'d',
                    1:'f'
                },
                d:{
                    0:'d',
                    1:'e'
                },
                e:{
                    0:'e',
                    1:'e'
                },
                f:{
                    0:'f',
                    1:'f'
                }
            } ,
            initialState:"a" ,
            finalStates:['e']
        };

        var startWith1Contains001DFA = DFAGenerator(lang)
        it('DFA for string 1001', function () {
            assert.isTrue(startWith1Contains001DFA('1001'))
        });

        it('DFA for string 0111', function () {
            assert.isFalse(startWith1Contains001DFA('0111'))
        });

        it('DFA for string 000', function () {
            assert.isFalse(startWith1Contains001DFA('000'))
        });

        it('DFA for string 100111010', function () {
            assert.isTrue(startWith1Contains001DFA('100111010'))
        });
    });
});