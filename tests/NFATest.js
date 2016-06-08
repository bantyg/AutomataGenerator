var assert = require('chai').assert;
var NFAGenerator = require('../src/nfa.js').NFAGenerator;

describe('Array', function() {
    describe('All strings which has even number of zeros', function () {
        var lang = {
            states: ["a","b"],
            alphabets : ['0','1'],
            transitionFun:{
                a:{
                    0:['a'],
                    1:['a','b']
                },
                b:{
                    0:[],
                    1:[]
                }
            } ,
            initialState:"a" ,
            finalStates:['b']
        };

        var endWith1NFA = NFAGenerator(lang);

        it('DFA for string 01', function () {
            assert.isTrue(endWith1NFA('01'))
        });

        it('DFA for string 0111', function () {
            assert.isTrue(endWith1NFA('0111'))
        });

        it('DFA for string 000', function () {
            assert.isFalse(endWith1NFA('000'))
        });

        it('DFA for string 00111010', function () {
            assert.isFalse(endWith1NFA('00111010'))
        });
    });
    describe(' Language w | w is string with length divisible by 2', function () {
        var lang = {
            states: ["q1","q2","q3"],
            alphabets : ['0','1'],
            transitionFun:{
                'q1': {0:['q2'], 1:['q2']},
                'q2': {0:['q3'], 1:['q3']},
                'q3': {0:['q2'], 1:['q2']}
            },
            initialState:"q1" ,
            finalStates:['q1','q3']
        };
        var dfa_for_even_string_length = NFAGenerator(lang);

        it('should accept string 00', function () {
            assert.equal(dfa_for_even_string_length('00'), true);
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_even_string_length(''));
        });
        it('should accept even length of string', function () {
            assert.ok(dfa_for_even_string_length('010110'));
        });
        it('should not accept single character', function () {
            assert.notOk(dfa_for_even_string_length('0'));
        });
        it('should not accept odd length of character', function () {
            assert.notOk(dfa_for_even_string_length('10101'));
        });
    });

    describe('Language w | w is string with length divisible by 2 or 3', function () {
        var lang = {
            states: ["q1","q2","q3","q4","q5","q6"],
            alphabets : ['0','1'],
            transitionFun:{
                'q1': {0:['q2','q3'], 1:['q2','q3']},
                'q2': {0:['q4'], 1:['q4']},
                'q3': {0:['q5'], 1:['q5']},
                'q4': {0:['q2'], 1:['q2']},
                'q5': {0:['q6'], 1:['q6']},
                'q6': {0:['q3'], 1:['q3'],9:['q2']}
            },
            initialState:"q1" ,
            finalStates:['q1','q4','q6']
        };
        var dfa_for_string_length_divisible_by_2_or_3 = NFAGenerator(lang);

        it('should accept string with length 2', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('00'));
        });
        it('should accept string with length 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('010'));
        });
        it('should accept empty string', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3(''));
        });
        it('should accept string with length divisible by both 2 & 3', function () {
            assert.ok(dfa_for_string_length_divisible_by_2_or_3('101010'));
        });
        it('should not accept string with length neither divisible by 2 nor 3', function () {
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('1'))
            assert.notOk(dfa_for_string_length_divisible_by_2_or_3('10101'));
        });
    });

});