import * as th from "api-astn-typedhandlers"
import { IExternalSchemaCache } from "../../implementation/internalInterface/interfaces/ExternalSchemaCache.p"
import { TInstanceError } from "../types/InstanceError.p"

export type F = <PAnnotation>(
    $: {
        id: string
    },
    $i: {
        logError: (
            $: {
                error: TInstanceError,
                annotation: PAnnotation | null,
            }
        ) => void
        handler: th.ITypedHandler<PAnnotation>
    },
    contextCache: IExternalSchemaCache<PAnnotation>,
    referenceCache: api.IExternalSchemaCache<PAnnotation>,
    $a: api.StartAsync
): tc.ITokenConsumer<PAnnotation>