
import * as pm from 'pareto-core-state'
import * as pa from 'pareto-core-async'
import * as pl from 'pareto-core-lib'


import * as pub from "../../../../../pub"

import * as test from "lib-pareto-test"

import { CgetTestSet} from "../definition/api.generated"

export const $$: CgetTestSet = () => {

    const builder = pm.createUnsafeDictionaryBuilder<test.T.TestElement>()
    function createTest(name: string, actual: string, expected: string) {
        builder.add(name, {
            type: ["test", {
                type: ["short string", {
                    actual: actual,
                    expected: expected
                }]
            }]
        })
    }

    return pa.asyncValue({
        elements: builder.getDictionary()
    })
}