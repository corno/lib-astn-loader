import * as pa from "pareto-core-types"
import * as tc from "astn-tokenconsumer-api"
import * as th from "astn-typedhandlers-api"
import { IAsyncRegistry, StartAsync } from "./AsyncRegistry"
import { InstanceError } from "../types/InstanceError"



export type IExternalSchemaCache<Annotation> = {
    createUnmarshaller:  (
        $: {
            schemaID: string
        },
        $i: {
            handleInstanceError: ($: {
                error: InstanceError
                annotation: Annotation
            }) => void
            handleSchemaError: () => void//SHOULD THIS BE A ITokenConsumer?
            handleSuccess: () => th.ITypedHandler<Annotation>
            handleNoEntity: () => tc.ITokenConsumer<Annotation>
        },
        startAsync: StartAsync
    ) => tc.ITokenConsumer<Annotation>,
}