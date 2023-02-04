
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"

import * as api from "../api"

import * as pub from "../../../../../pub"

import * as test from "lib-pareto-test"

export const $$: api.CgetTestSet = () => {

    const builder = pm.createUnsafeDictionaryBuilder<test.TTestElement>()
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

    return pl.asyncValue({
        elements: builder.getDictionary()
    })
}