// import * as pa from 'pareto-core-types'
// import { IAsyncRegistry } from "../../interface/interfaces/AsyncRegistry"
// import { INonValueAsync } from "./NonValueAsync"


// export function createAsyncRegistry(
//     callback: ($: IAsyncRegistry) => void
// ): INonValueAsync {
//     let done = false
//     return {
//         execute: (cb) => {
//             let counter = 0
//             callback({
//                 register: ($) => {
//                     if (done) {
//                         throw new Error("UNEXPECTED REGISTER AFTER DONE")
//                     }
//                     counter += 1
//                     $.execute(() => {
//                         counter -= 1
//                         if (counter === 0) {
//                             done = true
//                             cb()
//                         }
//                     })
//                 }
//             })
//         }
//     }
// }