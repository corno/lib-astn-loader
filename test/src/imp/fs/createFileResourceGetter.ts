import * as pa from "pareto-core-types"
import * as lib from "../../../lib/dist"

import * as pfa from "pareto-filesystem-api"
import * as pfr from "pareto-filesystem-res"


export function createFileResourceGetter(
    contextPath: lib.Path,
    onError: ($: pfa.TReadFileError) => void,
): lib.GetResource<lib.Path, string> {
    function nonValue(
    ): pa.IAsync<null> {
        return {
            execute: (cb) => {
                cb(null)
            }
        }
    }
    const fsRes = pfr.init()
    return ($, $i) => {
        return fsRes.file<null>(
            [contextPath, $.id],
            (data) => {
                const consumer = $i.init()
                consumer.onData(data)
                consumer.onEnd()
                return nonValue()
            },
            ($) => {
                if ($[0] === "no entity") {
                    $i.onNotExists()
                    return nonValue()

                } else {
                    $i.onFailed()
                    onError($)
                    return nonValue()
                }
            },
        )
    }
}
