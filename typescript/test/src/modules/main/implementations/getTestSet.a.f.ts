
import * as pm from 'pareto-core-state'
import * as pa from 'pareto-core-async'
import * as pl from 'pareto-core-lib'

import * as g_pub from "../../../../../pub"
import * as g_test from "lib-pareto-test"

import { A } from "../api.generated"

export const $$: A.getTestSet = () => {

    const builder = pm.createUnsafeDictionaryBuilder<g_test.T.TestElement>()
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