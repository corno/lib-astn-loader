
import * as th from "astn-typedhandlers-api"

type TV =
    | ["onEntry", {}]
    | ["onDictionaryClose", {}]
    | ["onDictionary", {}]
    | ["onGroup", {}]
    | ["onList", {}]
    | ["onMultilineString", {}]
    | ["onSimpleString", {}]
    | ["onTaggedUnion", {}]
    | ["onTypeReference", {}]
    | ["onProperty", {}]
    | ["onUnexpectedProperty", {}]
    | ["onGroupClose", {}]
    | ["onElement", {}]
    | ["onListClose", {}]
    | ["onOption", {}]
    | ["onUnexpectedOption", {}]
    | ["onTaggedUnionEnd", {}]

export function createLoggingTypedHandler<Annotation>(
    log: (tv: TV) => void
): th.ITypedHandler<Annotation> {
    function createLoggingTypedValueHandler(): th.ITypedValueHandler<Annotation> {
        return {
            onDictionary: ($) => {
                log(["onDictionary", {}])
                return createLoggingTypedDictionaryHandler()
            },
            onGroup: ($) => {
                log(["onGroup", {}])
                return createLoggingTypedGroupHandler()
            },
            onList: ($) => {
                log(["onList", {}])
                return createLoggingTypedListHandler()
            },
            onMultilineString: ($) => {
                log(["onMultilineString", {}])
                return createLoggingTypedDictionaryHandler()
            },
            onSimpleString: ($) => {
                log(["onSimpleString", {}])
                return createLoggingTypedDictionaryHandler()
            },
            onTaggedUnion: ($) => {
                log(["onTaggedUnion", {}])
                return createLoggingTypedTaggedUnionHandler()
            },
            onTypeReference: ($) => {
                log(["onTypeReference", {}])
                return createLoggingTypedValueHandler()
            },

        }
    }
    function createLoggingTypedDictionaryHandler(): th.IDictionaryHandler<Annotation> {
        return {
            onEntry: () => {
                log(["onEntry", {}])
                return createLoggingTypedValueHandler()
            },
            onClose: () => {
                log(["onDictionaryClose", {}])

            },
        }
    }
    function createLoggingTypedGroupHandler(): th.IGroupHandler<Annotation> {
        return {
            onProperty: () => {
                log(["onProperty", {}])
                return createLoggingTypedValueHandler()
            },
            onUnexpectedProperty: () => {
                log(["onUnexpectedProperty", {}])

            },
            onClose: () => {
                log(["onGroupClose", {}])
            }
        }
    }
    function createLoggingTypedListHandler(): th.IListHandler<Annotation> {
        return {
            onElement: () => {
                log(["onElement", {}])
                return createLoggingTypedValueHandler()
            },
            onClose: () => {
                log(["onListClose", {}])
            }
        }
    }
    function createLoggingTypedTaggedUnionHandler(): th.ITypedTaggedUnionHandler<Annotation> {
        return {
            onOption: () => {
                log(["onOption", {}])
                return createLoggingTypedValueHandler()
            },
            onUnexpectedOption: () => {
                log(["onUnexpectedOption", {}])
                return createLoggingTypedValueHandler()
            },
            onEnd: () => {
                log(["onTaggedUnionEnd", {}])

            }
        }
    }

    return {
        root: createLoggingTypedValueHandler(),
        onEnd: () => { }
    }
}
