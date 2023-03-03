// import { IStreamConsumer } from "./StreamConsumer"
// import { INonValueAsync } from "./NonValueAsync"

// export type GetResource<ID, DATA> = (
//     $: {
//         id: ID
//     },
//     $i: {
//         onNotExists: () => void
//         onFailed: () => void
//         init: () => IStreamConsumer<DATA>
//     }
// ) => INonValueAsync