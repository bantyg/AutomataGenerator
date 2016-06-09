var _ = require('lodash');

var NFAGenerator = function (tuple) {
        return function (string) {
            var initialState = tuple.initialState;
            var finalState = string.split('').reduce(function (prev,next) {
                var epsilonTransition = prev.map(function (state) {
                    if(!tuple.transitionFun[state]){
                        return state;
                    }
                    else if(tuple.transitionFun[state]["E"]){
                        return tuple.transitionFun[state]["E"].map(function (state) {
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

exports.NFAGenerator = NFAGenerator;