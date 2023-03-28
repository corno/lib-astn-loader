
import * as g_th from "glo-astn-typedhandlers"

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

export function createLoggingTypedHandler<PAnnotation>(
    log: (tv: TV) => void
): g_th.ASYNC.I.ValueHandler<PAnnotation> {
    function createLoggingTypedValueHandler(): g_th.ASYNC.I.ValueHandler<PAnnotation> {
        return {
            'dictionary': ($) => {
                log(["onDictionary", null])
                return createLoggingTypedDictionaryHandler()
            },
            'group': ($) => {
                log(["onGroup", null])
                return createLoggingTypedGroupHandler()
            },
            'list': ($) => {
                log(["onList", null])
                return createLoggingTypedListHandler()
            },
            'multilineString': ($) => {
                log(["onMultilineString", null])
                return createLoggingTypedDictionaryHandler()
            },
            'simpleString': ($) => {
                log(["onSimpleString", null])
                return createLoggingTypedDictionaryHandler()
            },
            'taggedUnion': ($) => {
                log(["onTaggedUnion", null])
                return createLoggingTypedTaggedUnionHandler()
            },
            'typeReference': ($) => {
                log(["onTypeReference", null])
                return createLoggingTypedValueHandler()
            },

        }
    }
    function createLoggingTypedDictionaryHandler(): g_th.ASYNC.I.DictionaryHandler<PAnnotation> {
        return {
            'data': () => {
                log(["onEntry", null])
                return createLoggingTypedValueHandler()
            },
            'end': () => {
                log(["onDictionaryClose", null])

            },
        }
    }
    function createLoggingTypedGroupHandler(): g_th.ASYNC.I.GroupHandler<PAnnotation> {
        return {
            'data': {
                'property': () => {
                    log(["onProperty", null])
                    return createLoggingTypedValueHandler()
                },
                'unexpectedProperty': () => {
                    log(["onUnexpectedProperty", null])

                },
            },
            'end': () => {
                log(["onGroupClose", null])
            }
        }
    }
    function createLoggingTypedListHandler(): g_th.ASYNC.I.ListHandler<PAnnotation> {
        return {
            'data': () => {
                log(["onElement", null])
                return createLoggingTypedValueHandler()
            },
            'end': () => {
                log(["onListClose", null])
            }
        }
    }
    function createLoggingTypedTaggedUnionHandler(): g_th.ASYNC.I.TaggedUnionHandler<PAnnotation> {
        return {
            'data': {
                'option': () => {
                    log(["onOption", null])
                    return createLoggingTypedValueHandler()
                },
                'unexpectedOption': () => {
                    log(["onUnexpectedOption", null])
                    return createLoggingTypedValueHandler()
                },
            },
            'end': () => {
                log(["onTaggedUnionEnd", null])

            }
        }
    }

    return createLoggingTypedValueHandler()
}
