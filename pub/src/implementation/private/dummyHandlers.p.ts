import * as h from "astn-handlers-api"

export function createDummyObjectHandler<PAnnotation>(): h.IObjectHandler<PAnnotation> {
    return {
        property: () => createDummyRequiredValueHandler(),
        anonymousProperty: () => createDummyValueHandler(),
        onEnd: () => { },
    }
}
export function createDummyArrayHandler<PAnnotation>(): h.IArrayHandler<PAnnotation> {
    return {
        element: () => createDummyValueHandler(),
        onEnd: () => { }
    }
}
export function createDummyRequiredValueHandler<PAnnotation>(): h.IRequiredValueHandler<PAnnotation> {
    return {
        missing: () => { },
        exists: createDummyValueHandler()
    }

}
export function createDummyTaggedUnionHandler<PAnnotation>(): h.ITaggedUnionHandler<PAnnotation> {
    return {
        option: () => createDummyRequiredValueHandler(),
        missingOption: () => createDummyRequiredValueHandler(),
        end: () => { }
    }
}

export function createDummyValueHandler<PAnnotation>(): h.IValueHandler<PAnnotation> {

    return {
        object: () => createDummyObjectHandler(),
        array: () => createDummyArrayHandler(),
        taggedUnion: () => createDummyTaggedUnionHandler(),
        simpleString: () => {

        },
        multilineString: () => {

        }
    }
}