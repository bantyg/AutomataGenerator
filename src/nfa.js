var _ = require('lodash');

var NFAGenerator = function (tuple) {
    return function (string) {
        var initialState = tuple.initialState;

        var finalState = string.split('').reduce(function (prev,next) {
            var states =  prev.map(function (state) {
                return tuple.transitionFun[state][next];
            });
            return _.flatten(states);
        },[initialState]);

        var isNFA = finalState.filter(function (state) {
            return tuple.finalStates.indexOf(state) > -1;
        });

        return isNFA.length > 0;
    };
};

var lang = {
    states: ["a","b"],
    transitionFun:{a:{
            0:['a'],
            1:['a','b']
        }, b:{
            0:[],
            1:[]
        }
    } ,
    initialState:"a" , finalStates:['b']
};


console.log(NFAGenerator(lang)("01"));



exports.NFAGenerator = NFAGenerator;