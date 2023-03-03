import * as pb from 'pareto-core-exe'
import * as pl from 'pareto-core-lib'
import * as ata from "astn-tokenizer-api"
import * as lib from "../../../../lib"
import * as atl from "astn-tokenizer-lib"

import { createLoggingTypedHandler } from "../createLoggingTypedHandler"
import { createFileResourceGetter } from "../../fs/createFileResourceGetter"

pb.runProgram(($) => {
    if ($.argument === undefined) {
        throw new Error("MISSING ARGUMENT")
    }

    const root = $.argument

    const tokLib = atl.init()

    const errorLog = pb.createStdErr()

    function createCache(
        path: lib.Path
    ) {
        return lib.createExternalSchemaCache<ata.TokenizerAnnotationData>(
            {
                logExternalSchemaError: ($) => {
                    errorLog.write(`external schema: ${lib.createExternalErrorMessage($.error)} @ ${$.range === null ? "??" : tokLib.createRangeMessage($.range)}`)
                    errorLog.write("\n")
                },

            },
            {
                getSchemaData: createFileResourceGetter(
                    path,
                    ($) => {
                        pl.logDebugMessage("FS ERROR")
                    }
                )
            },
        )
    }

    const contextDir: lib.Path = [root, "schemas"]
    const externalCache = createCache([root, "schemas"])
    const contextCache = createCache([contextDir])

    lib.fireAndForget(

        lib.createAsyncRegistry((registry) => {
            registry.register(
                createFileResourceGetter(
                    contextDir,
                    ($) => {
                        pl.logDebugMessage("FS ERRROR")
                    }
                )(
                    {
                        id: ["mrshl", "schemaschema@0.1"]
                    },
                    {
                        onFailed: () => {

                        },
                        onNotExists: () => {
                            pl.logDebugMessage("FILE DOES NOT EXIST")
                        },
                        init: () => {
                            return tokLib.createCreateTokenizer(
                                {
                                    onError: ($) => {

                                        errorLog.write(`${tokLib.createTokenizerErrorMessage($.error)} @ ${tokLib.createRangeMessage($.range)}`)
                                        errorLog.write("\n")
                                    }
                                }
                            )(
                                {
                                    consumer: lib.createDocumentLoader<ata.TokenizerAnnotationData>(
                                        {
                                            id: "schemaschema@0.1"
                                        },
                                        {
                                            logError: ($) => {
                                                errorLog.write(`${lib.createInternalErrorMessage($.error)} @ ${$.annotation === null ? "??" : tokLib.createRangeMessage($.annotation.range)}`)
                                                errorLog.write("\n")
                                            },
                                            handler: createLoggingTypedHandler(($) => {
                                                pl.logDebugMessage(`>>> ${$[0]}`)
                                            })
                                        },
                                        contextCache,
                                        externalCache,
                                        registry.register,
                                    )
                                }
                            )
                        }
                    }
                )
            )
        })
    )
})

