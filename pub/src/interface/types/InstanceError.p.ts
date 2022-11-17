
import * as apl from "lib-astn-parser"
import * as aul from "lig-astn-unmarshall"

export type TInstanceError =
| ["schema error", null]
| ["treeparser", apl.TreeParserError]
| ["headerparser", apl.HeaderError]
| ["unmarshall", aul.UnmarshallErrorType]
| ["found both context and internal schema", null]