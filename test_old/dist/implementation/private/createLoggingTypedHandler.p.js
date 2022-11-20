"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoggingTypedHandler = void 0;
function createLoggingTypedHandler(log) {
    function createLoggingTypedValueHandler() {
        return {
            onDictionary: ($) => {
                log(["onDictionary", null]);
                return createLoggingTypedDictionaryHandler();
            },
            onGroup: ($) => {
                log(["onGroup", null]);
                return createLoggingTypedGroupHandler();
            },
            onList: ($) => {
                log(["onList", null]);
                return createLoggingTypedListHandler();
            },
            onMultilineString: ($) => {
                log(["onMultilineString", null]);
                return createLoggingTypedDictionaryHandler();
            },
            onSimpleString: ($) => {
                log(["onSimpleString", null]);
                return createLoggingTypedDictionaryHandler();
            },
            onTaggedUnion: ($) => {
                log(["onTaggedUnion", null]);
                return createLoggingTypedTaggedUnionHandler();
            },
            onTypeReference: ($) => {
                log(["onTypeReference", null]);
                return createLoggingTypedValueHandler();
            },
        };
    }
    function createLoggingTypedDictionaryHandler() {
        return {
            onEntry: () => {
                log(["onEntry", null]);
                return createLoggingTypedValueHandler();
            },
            onClose: () => {
                log(["onDictionaryClose", null]);
            },
        };
    }
    function createLoggingTypedGroupHandler() {
        return {
            onProperty: () => {
                log(["onProperty", null]);
                return createLoggingTypedValueHandler();
            },
            onUnexpectedProperty: () => {
                log(["onUnexpectedProperty", null]);
            },
            onClose: () => {
                log(["onGroupClose", null]);
            }
        };
    }
    function createLoggingTypedListHandler() {
        return {
            onElement: () => {
                log(["onElement", null]);
                return createLoggingTypedValueHandler();
            },
            onClose: () => {
                log(["onListClose", null]);
            }
        };
    }
    function createLoggingTypedTaggedUnionHandler() {
        return {
            onOption: () => {
                log(["onOption", null]);
                return createLoggingTypedValueHandler();
            },
            onUnexpectedOption: () => {
                log(["onUnexpectedOption", null]);
                return createLoggingTypedValueHandler();
            },
            onEnd: () => {
                log(["onTaggedUnionEnd", null]);
            }
        };
    }
    return {
        root: createLoggingTypedValueHandler(),
        onEnd: () => { }
    };
}
exports.createLoggingTypedHandler = createLoggingTypedHandler;
