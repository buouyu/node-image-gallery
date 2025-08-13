export default interface Global {
    showErr(msg?: string, err?: Error): false
    showToast(msg: string): undefined
    showSuccess(msg: string): undefined
    loading(msg: string | false): undefined
    getUserInfo(): {
        id: number,
        name: string,
        nick_name: string,
        avatar: string
    },
    push(path: string, params?: Object, type?: 'navigate' | 'tab'): undefined,
    back(num: Number): undefined,
    getRoute(): Object,
    getPlatform(): Promise<'ios' | 'android' | 'mac' | 'windows' | 'linux'>,
    showModal(option: {
        title: string,
        content: string,
        showCancel: boolean,
        cancelText: string,
        cancelColor: string,
        confirmText: string,
        confirmColor: string,
    }): Promise<boolean | null>,
    getStorage(key: string): Object | string | null,
    setStorage(key: string, value: Object | string): undefined,
    deepCopy(data: Object): Object,
    showActionSheet(option: {
        title: string,
        itemList: string[],
    }): number
}