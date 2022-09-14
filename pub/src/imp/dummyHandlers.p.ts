import * as h from "astn-handlers-api"

export function createDummyObjectHandler<Annotation>(): h.IObjectHandler<Annotation> {
    return {
        property: () => createDummyRequiredValueHandler(),
        anonymousProperty: () => createDummyValueHandler(),
        onEnd: () => { },
    }
}
export function createDummyArrayHandler<Annotation>(): h.IArrayHandler<Annotation> {
    return {
        element: () => createDummyValueHandler(),
        onEnd: () => { }
    }
}
export function createDummyRequiredValueHandler<Annotation>(): h.IRequiredValueHandler<Annotation> {
    return {
        missing: () => { },
        exists: createDummyValueHandler()
    }

}
export function createDummyTaggedUnionHandler<Annotation>(): h.ITaggedUnionHandler<Annotation> {
    return {
        option: () => createDummyRequiredValueHandler(),
        missingOption: () => createDummyRequiredValueHandler(),
        end: () => { }
    }
}

export function createDummyValueHandler<Annotation>(): h.IValueHandler<Annotation> {

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