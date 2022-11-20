// import * as pl from "pareto-core-lib"
// import * as apl from "astn-parser-lib"
// import * as aul from "astn-unmarshall-lib"
// import { InstanceError } from "../interface/types/InstanceError"

// const parserLib = apl.init()
// const unmarshallLib = aul.init()

// export function createInternalErrorMessage($: InstanceError): string {
//     switch ($[0]) {
//         case "unmarshall":
//             return pl.cc($[1], ($) => {
//                 return unmarshallLib.createUnmarshallErrorMessage($)
//             })
//         case "treeparser":
//             return pl.cc($[1], ($) => {
//                 return parserLib.createTreeParserErrorMessage($)
//             })
//         case "found both context and internal schema":
//             return pl.cc($[1], ($) => {
//                 return `found both context schema and internal schema specification, ignoring internal schema specification`
//             })
//         case "schema error":
//             return pl.cc($[1], ($) => {
//                 return `error(s) in schema`
//             })
//         case "headerparser":
//             return pl.cc($[1], ($) => {
//                 return parserLib.createHeaderErrorMessage($)
//             })
//         default: return pl.au($[0])
//     }
// }