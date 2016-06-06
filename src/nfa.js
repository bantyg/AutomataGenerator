var _ = require('lodash');

var NFAGenerator = function (tuple) {
    var stateMachine = [tuple.initialState];
    return function (string) {
        var next = tuple.transitionFun[tuple.initialState][string[0]];
        string.split('').slice(1).forEach(function (alphabet) {
            next = tuple.transitionFun[next][alphabet];
            stateMachine.push(next);
        });
        return tuple.finalStates.indexOf(_.last(stateMachine)) != -1;
    };
};

exports.NFAGenerator = NFAGenerator;