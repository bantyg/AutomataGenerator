var _ = require('lodash');

var DFAGenerator = function (tuple) {
    return function (string) {
        var initialState = tuple.transitionFun[tuple.initialState][string[0]];
        var finalState = string.split('').slice(1).reduce(function (prev,next) {
            return tuple.transitionFun[prev][next];
        },initialState);
        return tuple.finalStates.indexOf(finalState) != -1;
    };
};

 

exports.DFAGenerator = DFAGenerator;
