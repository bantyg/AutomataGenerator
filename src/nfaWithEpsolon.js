var _ = require('lodash');

var nfaWithEpsilon = function (tuple) {
    return function (string) {
        var initialState = tuple.initialState;
        var finalState = string.split('').reduce(function (prev,next) {
            var states = [];
            if(tuple.transitionFun[prev[0]]["E"]){
                states = tuple.transitionFun[prev[0]]["E"].map(function (state) {
                    return tuple.transitionFun[state][next];
                })
            }
            else {
                states =  prev.map(function (state) {
                    return tuple.transitionFun[state][next];
                });

            }
            return _.flatten(states);
        },[initialState]);

        var isNFA = finalState.filter(function (state) {
            return tuple.finalStates.indexOf(state) > -1;
        });

        return isNFA.length > 0;
    };
};

exports.nfaWithEpsilon = nfaWithEpsilon;