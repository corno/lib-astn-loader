import * as pa from "pareto-core-types"
import * as pl from "pareto-core-lib"
import * as apl from "astn-parser-lib"
import * as th from "astn-typedhandlers-api"
import * as inf from "../interface"
import * as tc from "astn-tokenconsumer-api"

const parserLib = apl.init()

const contextSchemaName = "schema.astn-schema"


export function createDocumentLoader<Annotation>(
    $: {
        id: string
    },
    $i: {
        logError: (
            $: {
                error: inf.InstanceError,
                annotation: Annotation | null,
            }
        ) => void
        handler: th.ITypedHandler<Annotation>
    },
    contextCache: inf.IExternalSchemaCache<Annotation>,
    referenceCache: inf.IExternalSchemaCache<Annotation>,
    startAsync: inf.StartAsync
): tc.ITokenConsumer<Annotation> {
    function doOptionalContextSchema(
        handleSuccess: () => th.ITypedHandler<Annotation>,
        handleNotExists: () => tc.ITokenConsumer<Annotation>,
    ) {
        if ($.id === contextSchemaName) {
            //this *is* the context schema
            return handleNotExists()
        } else {
            return contextCache.createUnmarshaller(
                {
                    schemaID: contextSchemaName
                },
                {
                    handleInstanceError: ($) => {
                        $i.logError({
                            error: $.error,
                            annotation: $.annotation
                        })
                    },
                    handleSchemaError: () => {
                        $i.logError({
                            error: ["schema error", null],
                            annotation: null,
                        })
                    },
                    handleSuccess: handleSuccess,
                    handleNoEntity: handleNotExists
                },
                startAsync
            )
        }
    }
    return parserLib.createCreateHeaderParser<Annotation>(
        {
            onError: ($) => {
                $i.logError({
                    error: ["headerparser", $.error],
                    annotation: $.annotation
                })
            }
        },
    )({
        handler: {
            onEmbeddedSchema: ($) => {
                return doOptionalContextSchema(
                    () => {
                        $i.logError({
                            error: ["found both context and internal schema", null],
                            annotation: $.embeddedSchemaAnnotation
                        })
                        throw new Error("STRIP REDUNDANT EMBEDDED SCHEMA")
                        //return $i.handler
                    },
                    () => {
                        throw new Error("IMPME")
                    }
                )
            },
            onNoInternalSchema: () => {
                return doOptionalContextSchema(
                    () => $i.handler,
                    () => {
                        pl.logDebugMessage("NO SCHEMA AT ALL")
                        return {
                            onToken: () => {

                            },
                            onEnd: () => {

                            }
                        }
                    }
                )

            },
            onSchemaReference: ($) => {
                return doOptionalContextSchema(
                    () => {
                        $i.logError({
                            error: ["found both context and internal schema", null],
                            annotation: $.token.annotation
                        })
                        return $i.handler
                    },
                    () => {
                        return referenceCache.createUnmarshaller(
                            {
                                schemaID: $.token.token.value
                            },
                            {
                                handleInstanceError: ($) => {
                                    $i.logError({
                                        error: $.error,
                                        annotation: $.annotation
                                    })

                                },
                                handleSchemaError: () => {
                                    $i.logError({
                                        error: ["schema error", null],
                                        annotation: $.token.annotation,
                                    })
                                },
                                handleSuccess: () => $i.handler,
                                handleNoEntity: () => {
                                    pl.logDebugMessage("MISSING SCHEMA")
                                    return {
                                        onToken: () => {

                                        },
                                        onEnd: () => {

                                        }
                                    }
                                }
                            },
                            startAsync
                        )
                    }
                )

            }
        }
    })
}
