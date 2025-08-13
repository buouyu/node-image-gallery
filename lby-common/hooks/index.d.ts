import { Ref } from 'vue'
// type UseListOption = {
//     size: number,
//     filterWatchs: Ref[],
//     filterFn(list: object[]): object[]
// }
export declare function useList(watchers: Ref[], fn: (page?: { size: number, current: number }) => Promise<Object | Object[]>, option: {
    size: number,
    filterWatchs: Ref[],
    filter(originList: object[]): object[],
    isFirstLoading: boolean
}): {
    getList: (current: number) => Promise<Object | Object[]>,
    total: number,
    saveItem: (item: object) => Promise<null>
    current: number,
    list: Object[],
    isLoading: boolean
};