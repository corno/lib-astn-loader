// import * as pt from "pareto-core-types"
// import * as tc from "astn-tokenconsumer-api"
// import * as th from "astn-typedhandlers-api"
// import { IAsyncRegistry, StartAsync } from "./AsyncRegistry"
// import { TInstanceError } from "../types/InstanceError.p"



// export type IExternalSchemaCache<PAnnotation> = {
//     createUnmarshaller: (
//         $: {
//             readonly "schemaID": string
//         },
//         $i: {
//             handleInstanceError: ($: {
//                 readonly "error": TInstanceError
//                 readonly "annotation": PAnnotation
//             }) => void
//             handleSchemaError: () => void//SHOULD THIS BE A ITokenConsumer?
//             handleSuccess: () => th.ITypedHandler<PAnnotation>
//             handleNoEntity: () => tc.ITokenConsumer<PAnnotation>
//         },
//         $a: pt.StartAsync
//     ) => tc.ITokenConsumer<PAnnotation>,
// }