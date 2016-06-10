var _ = require('lodash');

var recursion = function (tuple,alphabet,state) {
    var states = [];
    if(!tuple.transitionFun[state]) return [];
    if(tuple.transitionFun[state]['e']){
        var epsilon = tuple.transitionFun[state]['e'].map(function (subState) {
            if (tuple.transitionFun[subState]['e']) {
                return recursion(tuple, alphabet, subState);
            }
            else return tuple.transitionFun[subState][alphabet] ? tuple.transitionFun[subState][alphabet] : subState;
        });
        states = states.concat(epsilon);
    }
    if(tuple.transitionFun[state][alphabet]){
        states = states.concat(tuple.transitionFun[state][alphabet]);
    }
    return states;
};

var NFAGenerator = function (tuple) {
    return function (string) {
        var initialState = tuple.initialState;
        var finalState = string.split('').reduce(function (states,alphabet) {
            var subStates =  states.map(function (state) {
                return recursion(tuple,alphabet,state)
            });
            return _.flattenDeep(subStates);
        },[initialState]);
        return _.intersection(tuple.finalStates, finalState).length > 0;
    };
};

exports.NFAGenerator = NFAGenerator;