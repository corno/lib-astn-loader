
export type IStreamConsumer<DATA> = {
    onData: ($: DATA) => void
    onEnd: () => void
}