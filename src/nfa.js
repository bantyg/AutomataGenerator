var _ = require('lodash');

var checkSubset = function (superSet, subset) {
    var set = subset.filter(function (value) {
        return superSet.indexOf(value) > -1;
    });
    return set.length == subset.length;
};

var getEpsilonStates = function (states, transitionFunction) {
    return states.map(function (state) {
        if(transitionFunction[state] && transitionFunction[state]["e"])
            return transitionFunction[state]["e"];
    })
};

var getAllEpsilonStates = function (transitionFunction, states) {
    var array = states;
    var currentStates = getEpsilonStates(states,transitionFunction);
    currentStates = _.compact(_.flattenDeep(currentStates));
    if(checkSubset(array, currentStates)){
        return _.union(array,currentStates);
    }
    return getAllEpsilonStates(transitionFunction,_.union(array,currentStates));
};

var reducer = function (tuple,symbols,initialStates) {
    return symbols.reduce(function (states, symbol) {
        var traversedStates = states.map(function (state) {
            if (tuple.transitionFun[state] && tuple.transitionFun[state][symbol]) {
                return getAllEpsilonStates(tuple.transitionFun, tuple.transitionFun[state][symbol]);
            }
        });
        return _.flattenDeep(traversedStates);
    }, initialStates);
};

var NFAGenerator = function (tuple) {
    return function (string) {
        var symbols = string.split('');
        var initialStates = getAllEpsilonStates(tuple.transitionFun, [tuple.initialState]);
        var finalStates = reducer(tuple,symbols,initialStates);
        return _.intersection(finalStates, tuple.finalStates).length > 0;
    };
};

exports.NFAGenerator = NFAGenerator;
