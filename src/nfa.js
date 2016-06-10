var _ = require('lodash');

var handleEpsilon = function (tuple, alphabet,state) {
    return tuple.transitionFun[state]['e'].map(function (subState) {
        if (tuple.transitionFun[subState]['e']) {
            return stateTraverser(tuple, alphabet, subState);
        }
        else return tuple.transitionFun[subState][alphabet] ? tuple.transitionFun[subState][alphabet] : subState;
    });
};

var getStatesFollowedByEpsilons = function (tuple, state, alphabet) {
    return tuple.transitionFun[state][alphabet].map(function (eachState) {
        if(tuple.transitionFun[eachState] && tuple.transitionFun[eachState]['e']){
            return handleEpsilon(tuple,alphabet,eachState);
        }
        else return [];
    });
};

var stateTraverser = function (tuple, alphabet, state) {
    var states = [];
    if(!tuple.transitionFun[state]) return [];
    if(tuple.transitionFun[state][alphabet]){
        var subStates =  getStatesFollowedByEpsilons(tuple,state,alphabet);
        states = states.concat(subStates,tuple.transitionFun[state][alphabet])
    }
    if(tuple.transitionFun[state]['e']){
        states = states.concat(handleEpsilon(tuple,alphabet,state));
    }
    return states;
};

var NFAForEmptyString = function (tuple) {
    var result = tuple.transitionFun[tuple.initialState]["e"].map(function (state) {
        return tuple.transitionFun[state]["e"] ? tuple.transitionFun[state]["e"] : state
    });
    return _.flatMapDeep(result);
};

var NFAGenerator = function (tuple) {
    return function (string) {
        var finalState = [];
        if(string.length == 0 && tuple.transitionFun[tuple.initialState]["e"])
            finalState = NFAForEmptyString(tuple);
        else {
            finalState = string.split('').reduce(function (states,alphabet) {
                var subStates =  states.map(function (state) {
                    return stateTraverser(tuple,alphabet,state)
                });
                return _.flattenDeep(subStates);
            },[tuple.initialState]);
        }
        return _.intersection(tuple.finalStates, finalState).length > 0;
    };
};

exports.NFAGenerator = NFAGenerator;