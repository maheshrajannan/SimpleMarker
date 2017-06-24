    //http://codeinthehole.com/writing/inspecting-javascript-objects/
    //INFO-CRITICAL:http://stackoverflow.com/questions/16261993/jqgrid-dynamic-columns-and-data-by-json
var Inspect = {
    TYPE_FUNCTION: 'function',
    // Returns an array of (the names of) all methods
    //TODO: add the link from where you downloaded this from.
    methods: function(obj) {
        var testObj = obj || self;
        var methods = [];
        for (prop in testObj) {
//            if (typeof testObj[prop] == Inspect.TYPE_FUNCTION) {
//            alert('Inspect['+prop+']'+Inspect[prop]);        
//This check only removes the constructor typeof testObj[prop] == Inspect.TYPE_FUNCTION                
            if (typeof testObj[prop] == Inspect.TYPE_FUNCTION && typeof Inspect[prop] != Inspect.TYPE_FUNCTION) {
                methods.push(prop);
            }
        }
        return methods;
    },
    // Returns an array of (the names of) all properties
    properties: function(obj) {
        var testObj = obj || self;
        var properties = [];
        for (prop in testObj) {
            if (typeof testObj[prop] != Inspect.TYPE_FUNCTION && typeof Inspect[prop] != Inspect.TYPE_FUNCTION) {
                properties.push(prop);
            }
        }
        return properties;
    }
} 