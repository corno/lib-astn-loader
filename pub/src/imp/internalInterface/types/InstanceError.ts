
import * as apl from "astn-parser-lib"
import * as aul from "astn-unmarshall-lib"

export type InstanceError =
| ["schema error", {}]
| ["treeparser", apl.TreeParserError]
| ["headerparser", apl.HeaderError]
| ["unmarshall", aul.UnmarshallErrorType]
| ["found both context and internal schema", {}]