// import * as pl from "pareto-core-lib"
// import * as atl from "astn-tokenizer-lib"
// import * as apl from "astn-parser-lib"
// import * as ael from "astn-expect-lib"
// import { ExternalSchemaError } from "../interface/types/ExternalSchemaError"

// const tokLib = atl.init()
// const parserLib = apl.init()
// const expectLib = ael.init()

// export function createExternalErrorMessage($: ExternalSchemaError): string {
//     switch ($[0]) {
//         // case "retrieval":
//         //     return pl.cc($[1], ($) => {
//         //         return `retrieval error`
//         //     })
//         case "deserialize":
//             return pl.cc($[1], ($) => {
//                 return `FIXME DESER`
//                 //return mrshlschemaLib.createDeserializeErrorMessage()
//             })
//         case "expect":
//             return pl.cc($[1], ($) => {
//                 return expectLib.createExpectIssueMessage($)
//             })
//         case "treeparser":
//             return pl.cc($[1], ($) => {
//                 return parserLib.createTreeParserErrorMessage($)
//             })
//         case "tokenizer":
//             return pl.cc($[1], ($) => {
//                 return tokLib.createTokenizerErrorMessage($)
//             })
//         case "headerparser":
//             return pl.cc($[1], ($) => {
//                 return parserLib.createHeaderErrorMessage($)
//             })
//         case "header is not a schema reference":
//             return pl.cc($[1], ($) => {
//                 return `header is not a schema reference`
//             })
//         default: return pl.au($[0])
//     }
// }
