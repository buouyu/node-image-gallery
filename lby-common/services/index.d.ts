

type Options = {
    header: object,
    url: string,
    method?: 'GET' | 'POST' | 'DELETE',
    data: object,
}
type RqsResult = Promise<[null, Object | Object[]] | [Error, null] | Object>
interface RQS {
    request: (options: Options) => RqsResult;
    get: (url: string, data: object, option: Options) => RqsResult;
    post: (url: string, data: object, option: Options) => RqsResult;
    delete: (url: string, data: object) => RqsResult;
}
export declare const rqs: RQS
export declare class CommonRequest {
    constructor(base: string) {

    }
    save(props: object): Promise<[null, Object] | [Error, null]>
    delete(id: number | string): RqsResult
    get(id: number | string): Promise<Object | null>
    get_one(props: object, callBack?: Function): Promise<Object | null>
    get_list(props: object, callBack?: Function): Promise<Object[]>
    get_page_list(props: object, page?: { current: number, size: number }, callBack?: Function): Promise<{
        current: number,
        size: number,
        total: number,
        records: Object[]
    }>
}

export declare function uploadFile(fileOrPath: string, data: object): Promise<Object>
