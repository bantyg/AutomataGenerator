var assert = require('chai').assert;
var NFAWithEpsilon = require('../src/nfa.js').NFAGenerator;

describe("NFA Generator", function(){
    describe("NFA for languages with epsilon", function(){
        var language = {
            "states" : ["q1", "q2", "q3", "q4", "q5", "q6"],
            "alphabets" : ["1", "0"],
            "transitionFun" : {
                "q1": {"E": ["q2","q3"]},
                "q2": {"1": ["q2"], "0":["q4"]},
                "q3": {"0": ["q3"], "1":["q5"]},
                "q4": {"0": ["q2"], "1":["q2"]},
                "q5": {"0": ["q5"],"1": ["q6"]},
                "q6": {"0": ["q6"]}
            },
            "initialState" : "q1" ,
            "finalStates" : ["q2", "q6"]
        };

        var nfa_for_strings_contains_exactly_two_1s_or_even_0s = NFAWithEpsilon(language);
        it("should return true for 11", function(){
            assert.isTrue(nfa_for_strings_contains_exactly_two_1s_or_even_0s("11"));
        });
        it("should return true for 00", function(){
            assert.isTrue(nfa_for_strings_contains_exactly_two_1s_or_even_0s("00"));
        });
        it("should return true for 1001", function(){
            assert.isTrue(nfa_for_strings_contains_exactly_two_1s_or_even_0s("1001"));
        });
    });
    
    describe("NFA for languages with epsilon...", function(){
        it("should accept string with tuple_two_or_three_length with multiple epsilon transition",function(){
            var tuple_two_or_three_length = {
                transitionFun:{
                    "q1":{'E':["q2","q5"]},
                    "q2":{"0":["q3"]},
                    "q3":{"0":["q4"]},
                    "q5":{"0":["q6"]},
                    "q6":{"0":["q7"]},
                    "q7":{"E":["q8"]},
                    "q8":{"E":["q9"]},
                    "q9":{"0":["q4"]}
                },
                alphabets:["0"],
                states:["q1","q2","q3","q4","q5","q6","q7","q8","q9"],
                initialState:"q1",
                finalStates:["q4"]
            };

            var nfa_two_or_three_length = NFAWithEpsilon(tuple_two_or_three_length);
            assert.isFalse(nfa_two_or_three_length("0"));
            assert.isTrue(nfa_two_or_three_length("00"));
            assert.isTrue(nfa_two_or_three_length("000"));

        })
    });
});

