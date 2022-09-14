
import * as th from "astn-typedhandlers-api"

type TV =
    | ["onEntry", null]
    | ["onDictionaryClose", null]
    | ["onDictionary", null]
    | ["onGroup", null]
    | ["onList", null]
    | ["onMultilineString", null]
    | ["onSimpleString", null]
    | ["onTaggedUnion", null]
    | ["onTypeReference", null]
    | ["onProperty", null]
    | ["onUnexpectedProperty", null]
    | ["onGroupClose", null]
    | ["onElement", null]
    | ["onListClose", null]
    | ["onOption", null]
    | ["onUnexpectedOption", null]
    | ["onTaggedUnionEnd", null]

export function createLoggingTypedHandler<Annotation>(
    log: (tv: TV) => void
): th.ITypedHandler<Annotation> {
    function createLoggingTypedValueHandler(): th.ITypedValueHandler<Annotation> {
        return {
            onDictionary: ($) => {
                log(["onDictionary", null])
                return createLoggingTypedDictionaryHandler()
            },
            onGroup: ($) => {
                log(["onGroup", null])
                return createLoggingTypedGroupHandler()
            },
            onList: ($) => {
                log(["onList", null])
                return createLoggingTypedListHandler()
            },
            onMultilineString: ($) => {
                log(["onMultilineString", null])
                return createLoggingTypedDictionaryHandler()
            },
            onSimpleString: ($) => {
                log(["onSimpleString", null])
                return createLoggingTypedDictionaryHandler()
            },
            onTaggedUnion: ($) => {
                log(["onTaggedUnion", null])
                return createLoggingTypedTaggedUnionHandler()
            },
            onTypeReference: ($) => {
                log(["onTypeReference", null])
                return createLoggingTypedValueHandler()
            },

        }
    }
    function createLoggingTypedDictionaryHandler(): th.IDictionaryHandler<Annotation> {
        return {
            onEntry: () => {
                log(["onEntry", null])
                return createLoggingTypedValueHandler()
            },
            onClose: () => {
                log(["onDictionaryClose", null])

            },
        }
    }
    function createLoggingTypedGroupHandler(): th.IGroupHandler<Annotation> {
        return {
            onProperty: () => {
                log(["onProperty", null])
                return createLoggingTypedValueHandler()
            },
            onUnexpectedProperty: () => {
                log(["onUnexpectedProperty", null])

            },
            onClose: () => {
                log(["onGroupClose", null])
            }
        }
    }
    function createLoggingTypedListHandler(): th.IListHandler<Annotation> {
        return {
            onElement: () => {
                log(["onElement", null])
                return createLoggingTypedValueHandler()
            },
            onClose: () => {
                log(["onListClose", null])
            }
        }
    }
    function createLoggingTypedTaggedUnionHandler(): th.ITypedTaggedUnionHandler<Annotation> {
        return {
            onOption: () => {
                log(["onOption", null])
                return createLoggingTypedValueHandler()
            },
            onUnexpectedOption: () => {
                log(["onUnexpectedOption", null])
                return createLoggingTypedValueHandler()
            },
            onEnd: () => {
                log(["onTaggedUnionEnd", null])

            }
        }
    }

    return {
        root: createLoggingTypedValueHandler(),
        onEnd: () => { }
    }
}
