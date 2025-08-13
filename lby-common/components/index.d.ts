import { DefineComponent } from 'vue';
// export declare const SearchPicker: DefineComponent
// export declare const SearchDate: DefineComponent
// export declare const SearchSelect: DefineComponent
// export declare const Field: DefineComponent
// export declare const Form: DefineComponent
// export declare const Code: DefineComponent


export declare const ListPage: DefineComponent<{
    total?: number,
    current?: number,
    list: Object[],
    getList: Function,
    isSelect?: Boolean,
    isLoading?: Boolean,
    selectMiddleware?: Function,
    singleSelect?: Boolean,
    isNotItemStyle?: Boolean,
}, {
    header: Object,
    bar: Object,
    item: Object,
    empty: Object,
    footer: Object
}, {
    (event: 'onSelect', item: object, selectList: object[], isAll: boolean): void;
}>
export declare const Popup: DefineComponent<{
    mode?: 'bottom' | 'center',
    title?: string,
    cancelText?: string,
    okText?: string,
}, {}, {
    (event: 'confirm'): void;
    (event: 'close'): void;
}>
export declare const SingleLineText: DefineComponent
