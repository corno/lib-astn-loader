// import * as pt from "pareto-core-types"
// import * as pl from "pareto-core-lib"


// import * as apl from "lib-astn-parser"
// import * as th from "api-astn-typedhandlers"
// import * as tc from "api-astn-tokenconsumer"

// import * as api from "../../interface"


// const parserLib = apl.init()

// const contextSchemaName = "schema.astn-schema"


// export function createDocumentLoader<PAnnotation>(
//     $: {
//         id: string
//     },
//     $i: {
//         logError: (
//             $: {
//                 error: api.InstanceError,
//                 annotation: PAnnotation | null,
//             }
//         ) => void
//         handler: th.ITypedHandler<PAnnotation>
//     },
//     contextCache: api.IExternalSchemaCache<PAnnotation>,
//     referenceCache: api.IExternalSchemaCache<PAnnotation>,
//     $a: api.StartAsync
// ): tc.ITokenConsumer<PAnnotation> {
//     function doOptionalContextSchema(
//         handleSuccess: () => th.ITypedHandler<PAnnotation>,
//         handleNotExists: () => tc.ITokenConsumer<PAnnotation>,
//     ) {
//         if ($.id === contextSchemaName) {
//             //this *is* the context schema
//             return handleNotExists()
//         } else {
//             return contextCache.createUnmarshaller(
//                 {
//                     schemaID: contextSchemaName
//                 },
//                 {
//                     handleInstanceError: ($) => {
//                         $i.logError({
//                             error: $.error,
//                             annotation: $.annotation
//                         })
//                     },
//                     handleSchemaError: () => {
//                         $i.logError({
//                             error: ["schema error", null],
//                             annotation: null,
//                         })
//                     },
//                     handleSuccess: handleSuccess,
//                     handleNoEntity: handleNotExists
//                 },
//                 $a
//             )
//         }
//     }
//     return parserLib.createCreateHeaderParser<PAnnotation>(
//         {
//             onError: ($) => {
//                 $i.logError({
//                     error: ["headerparser", $.error],
//                     annotation: $.annotation
//                 })
//             }
//         },
//     )({
//         handler: {
//             onEmbeddedSchema: ($) => {
//                 return doOptionalContextSchema(
//                     () => {
//                         $i.logError({
//                             error: ["found both context and internal schema", null],
//                             annotation: $.embeddedSchemaAnnotation
//                         })
//                         throw new Error("STRIP REDUNDANT EMBEDDED SCHEMA")
//                         //return $i.handler
//                     },
//                     () => {
//                         throw new Error("IMPME")
//                     }
//                 )
//             },
//             onNoInternalSchema: () => {
//                 return doOptionalContextSchema(
//                     () => $i.handler,
//                     () => {
//                         pl.logDebugMessage("NO SCHEMA AT ALL")
//                         return {
//                             onToken: () => {

//                             },
//                             onEnd: () => {

//                             }
//                         }
//                     }
//                 )

//             },
//             onSchemaReference: ($) => {
//                 return doOptionalContextSchema(
//                     () => {
//                         $i.logError({
//                             error: ["found both context and internal schema", null],
//                             annotation: $.token.annotation
//                         })
//                         return $i.handler
//                     },
//                     () => {
//                         return referenceCache.createUnmarshaller(
//                             {
//                                 schemaID: $.token.token.value
//                             },
//                             {
//                                 handleInstanceError: ($) => {
//                                     $i.logError({
//                                         error: $.error,
//                                         annotation: $.annotation
//                                     })

//                                 },
//                                 handleSchemaError: () => {
//                                     $i.logError({
//                                         error: ["schema error", null],
//                                         annotation: $.token.annotation,
//                                     })
//                                 },
//                                 handleSuccess: () => $i.handler,
//                                 handleNoEntity: () => {
//                                     pl.logDebugMessage("MISSING SCHEMA")
//                                     return {
//                                         onToken: () => {

//                                         },
//                                         onEnd: () => {

//                                         }
//                                     }
//                                 }
//                             },
//                             $a
//                         )
//                     }
//                 )

//             }
//         }
//     })
// }
