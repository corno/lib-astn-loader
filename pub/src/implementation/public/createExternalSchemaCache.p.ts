import * as pl from "pareto-core-lib"
import { IExternalSchemaCache } from "../../interface"
import * as ata from "astn-tokenizer-api"
import { ExternalSchemaError } from "../interface/types/ExternalSchemaError"
import * as tc from "astn-tokenconsumer-api"
import * as prl from "pareto-resolve-lib"
import * as atl from "astn-tokenizer-lib"
import * as apl from "astn-parser-lib"

import * as aml from "astn-mrshlschema-lib"
import * as ael from "astn-expect-lib"
import * as aul from "astn-unmarshall-lib"
import { createDummyArrayHandler, createDummyObjectHandler, createDummyRequiredValueHandler, createDummyTaggedUnionHandler, createDummyValueHandler } from "./dummyHandlers"

import * as th from "astn-typedhandlers-api"
import { GetResource } from "./generic/GetResource"
import { Path } from "./generic/Path"


const tokLib = atl.init()
const parserLib = apl.init()
const mrshlschemaLib = aml.init()
const expectLib = ael.init()
const unmarshallLib = aul.init()

export function createExternalSchemaCache<PAnnotation>(
    $i: {
        logExternalSchemaError: (
            $: {
                error: ExternalSchemaError,
                range: ata.Range | null,
            }
        ) => void
    },
    $c: {
        getSchemaData: GetResource<Path, string>,
    },
): IExternalSchemaCache<PAnnotation> {

    type CreateUnmarshallStack<PAnnotation> = (
        $i: {
            handler: th.ITypedHandler<PAnnotation>
        }
    ) => tc.ITokenConsumer<PAnnotation>
    type Subscriber = {
        onFailed: () => void
        onNoEntity: () => void
        onSuccess: (createUnmarshaller: CreateUnmarshallStack<PAnnotation>) => void
    }
    type SchemaState =
        | ["awaiting", {
            subscribers: Subscriber[]
        }]
        | ["failed", {
        }]
        | ["no entity", {
        }]
        | ["success", {
            createUnmarshaller: CreateUnmarshallStack<PAnnotation>
        }]
    type SchemaData = {
        state: SchemaState
    }
    const schemas: {
        [key: string]: SchemaData
    } = {}

    const lese = $i.logExternalSchemaError
    const getSchemaData = $c.getSchemaData

    return {
        createUnmarshaller: ($, $i, startAsync) => {
            const lie = $i.handleInstanceError
            function getOrCreateSchemaData(): SchemaData {

                const schema = schemas[$.schemaID]
                if (schema !== undefined) {
                    return schema
                } else {
                    const schema: SchemaData = {
                        state: ["awaiting", {
                            subscribers: []
                        }]
                    }
                    schemas[$.schemaID] = schema
                    startAsync(
                        getSchemaData(
                            {
                                id: [$.schemaID],
                            },
                            {
                                onFailed: () => {
                                    if (schema.state[0] !== "awaiting") {
                                        throw new Error("UNEXPECTED")
                                    }
                                    schema.state[1].subscribers.forEach(($) => {
                                        $.onFailed()
                                    })
                                },
                                onNotExists: () => {
                                    if (schema.state[0] !== "awaiting") {
                                        throw new Error("UNEXPECTED")
                                    }
                                    schema.state[1].subscribers.forEach(($) => {
                                        $.onNoEntity()
                                    })

                                },
                                init: () => {
                                    if (schema.state[0] !== "awaiting") {
                                        throw new Error("UNEXPECTED")
                                    }
                                    const subscribers = schema.state[1].subscribers
                                    function cb2($: CreateUnmarshallStack<PAnnotation> | null) {
                                        if ($ === null) {
                                            schema.state = ["failed", null]
                                            subscribers.forEach((s) => {
                                                s.onFailed()
                                            })
                                        } else {
                                            schema.state = ["success", { createUnmarshaller: $ }]

                                            subscribers.forEach((s) => {
                                                s.onSuccess($)
                                            })
                                        }
                                    }
                                    const schemaConsumer = tokLib.createCreateTokenizer({
                                        onError: ($) => {
                                            lese({
                                                error: ["tokenizer", $.error],
                                                range: $.range
                                            })
                                        }
                                    })({
                                        consumer: parserLib.createCreateHeaderParser<ata.TokenizerAnnotationData>(
                                            {
                                                onError: ($) => {
                                                    lese({
                                                        error: ["headerparser", $.error],
                                                        range: $.annotation.range,
                                                    })
                                                }
                                            },
                                        )({
                                            handler: {
                                                onEmbeddedSchema: ($) => {
                                                    lese({
                                                        error: ["header is not a schema reference", null],
                                                        range: $.embeddedSchemaAnnotation.range,
                                                    })
                                                    return {
                                                        onToken: () => { },
                                                        onEnd: () => { },
                                                    }
                                                },
                                                onNoInternalSchema: ($) => {
                                                    lese({
                                                        error: ["header is not a schema reference", null],
                                                        range: null,
                                                    })
                                                    return {
                                                        onToken: () => { },
                                                        onEnd: () => { },
                                                    }
                                                },
                                                onSchemaReference: ($) => {
                                                    if ($.token.token.value !== "mrshl/schemaschema@0.1") {
                                                        throw new Error("SFSF)(@(W")
                                                    }
                                                    const schemaResolveRegistry = prl.createResolveRegistry(
                                                        ($) => {
                                                            throw new Error("HANDLE ME")
                                                        }
                                                    )
                                                    return parserLib.createCreateTreeParser<ata.TokenizerAnnotationData>(
                                                        {
                                                            onError: ($) => {
                                                                lese({
                                                                    error: ["treeparser", $.error],
                                                                    range: $.annotation.range
                                                                })
                                                            }
                                                        },
                                                    )(
                                                        {
                                                            handler: {
                                                                root: mrshlschemaLib.createCreateDeserializer<ata.TokenizerAnnotationData>(
                                                                    {
                                                                        onError: ($) => {

                                                                            lese({
                                                                                error: ["deserialize", $.error],
                                                                                range: $.annotation === null ? null : $.annotation.range
                                                                            })
                                                                        }
                                                                    },
                                                                    schemaResolveRegistry,
                                                                    expectLib.createCreateExpectContext<ata.TokenizerAnnotationData>(
                                                                        {
                                                                            issueHandler: ($) => {

                                                                                lese({
                                                                                    error: ["expect", $.issue],
                                                                                    range: $.annotation === null ? null : $.annotation.range
                                                                                })
                                                                            },
                                                                            createDummyValueHandler: createDummyValueHandler
                                                                        },
                                                                    )(
                                                                        {
                                                                            onDuplicateEntry: ["ignore", null],
                                                                            duplicateEntrySeverity: ["error", null],
                                                                        }
                                                                    ),
                                                                )({
                                                                    onDone: ($) => {
                                                                        if ($ === null) {
                                                                            cb2(null)
                                                                        } else {
                                                                            const convertResolveRegistry = prl.createResolveRegistry(
                                                                                ($) => {
                                                                                    throw new Error("HANDLE ME")
                                                                                }
                                                                            )
                                                                            const astnSchema = mrshlschemaLib.createConvertToASTNSchema()(
                                                                                $,
                                                                                convertResolveRegistry,
                                                                            )
                                                                            const createUnmarshallStack: CreateUnmarshallStack<PAnnotation> = ($i) => {
                                                                                return parserLib.createCreateTreeParser<PAnnotation>(
                                                                                    {
                                                                                        onError: ($) => {
                                                                                            lie({
                                                                                                error: ["treeparser", $.error],
                                                                                                annotation: $.annotation,
                                                                                            })
                                                                                        }
                                                                                    },
                                                                                )({
                                                                                    handler: {
                                                                                        root: unmarshallLib.createCreateUnmarshaller<PAnnotation>(
                                                                                            {
                                                                                                onError: ($) => {
                                                                                                    lie({
                                                                                                        error: ["unmarshall", $.type],
                                                                                                        annotation: $.annotation,
                                                                                                    })
                                                                                                },
                                                                                                dummyHandlers: {
                                                                                                    requiredValue: createDummyRequiredValueHandler,
                                                                                                    value: createDummyValueHandler,
                                                                                                    object: createDummyObjectHandler,
                                                                                                    array: createDummyArrayHandler,
                                                                                                    taggedUnion: createDummyTaggedUnionHandler,
                                                                                                },
                                                                                            }
                                                                                        )(
                                                                                            {
                                                                                                schema: astnSchema,
                                                                                            },
                                                                                            {
                                                                                                handler: $i.handler.root,
                                                                                            }
                                                                                        ),
                                                                                        onEnd: () => {
                                                                                            $i.handler.onEnd()
                                                                                        }
                                                                                    },
                                                                                })
                                                                            }
                                                                            cb2(createUnmarshallStack)
                                                                        }
                                                                    }
                                                                }),
                                                                onEnd: () => { },
                                                            },
                                                        }
                                                    )
                                                },
                                            },
                                        }),
                                    })
                                    return {
                                        onData: ($) => {
                                            schemaConsumer.onData($)
                                        },
                                        onEnd: () => {
                                            schemaConsumer.onEnd()
                                        }
                                    }
                                }
                            }
                        )
                    )
                    return schema
                }
            }
            const schema = getOrCreateSchemaData()
            switch (schema.state[0]) {
                case "awaiting":
                    return pl.cc(schema.state[1], ($) => {
                        const queue: {
                            token: tc.Token
                            annotation: Annotation
                        }[] = []
                        let endAnnotation: Annotation | null = null
                        const subscriber: Subscriber = {
                            onFailed: () => {
                                $i.handleSchemaError()
                            },
                            onNoEntity: () => {
                                const consumer = $i.handleNoEntity()
                                queue.forEach((token) => {
                                    consumer.onToken(token)
                                })
                                if (endAnnotation !== null) {
                                    consumer.onEnd(endAnnotation)
                                }
                            },
                            onSuccess: (createUnmarshaller) => {
                                const consumer = createUnmarshaller({
                                    handler: $i.handleSuccess()
                                })
                                queue.forEach((token) => {
                                    consumer.onToken(token)
                                })
                                if (endAnnotation !== null) {
                                    consumer.onEnd(endAnnotation)
                                }
                            }
                        }
                        $.subscribers.push(subscriber)
                        return {
                            onToken: ($) => {
                                queue.push($)
                            },
                            onEnd: ($) => {
                                endAnnotation = $
                            }
                        }
                    })
                case "failed":
                    return pl.cc(schema.state[1], ($) => {
                        $i.handleSchemaError()
                        return {
                            onToken: () => {
                            },
                            onEnd: () => {

                            }
                        }
                    })
                case "no entity":
                    return pl.cc(schema.state[1], ($) => {
                        return $i.handleNoEntity()
                    })
                case "success":
                    return pl.cc(schema.state[1], ($) => {
                        const createUnmarshaller = $.createUnmarshaller
                        return createUnmarshaller({
                            handler: $i.handleSuccess(),
                        })
                    })
                default: return pl.au(schema.state[0])
            }
        }
    }
}
