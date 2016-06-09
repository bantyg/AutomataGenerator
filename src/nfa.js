var _ = require('lodash');

var NFAGenerator = function (tuple) {
        return function (string) {
            var initialState = tuple.initialState;
            var finalState = string.split('').reduce(function (prev,next) {
                var epsilonTransition = prev.map(function (state) {
                    if(!tuple.transitionFun[state]){
                        return state;
                    }
                    else if(tuple.transitionFun[state]["e"]){
                        return tuple.transitionFun[state]["e"].map(function (state) {
                            return tuple.transitionFun[state][next];
                        })
                    }
                    else {
                        return tuple.transitionFun[state][next];
                    }
                });
                return _.flattenDeep(epsilonTransition);
            },[initialState]);
            return _.intersection(tuple.finalStates, finalState).length > 0;

        };
};

exports.NFAGenerator = NFAGenerator;