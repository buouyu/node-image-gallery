// import { Global } from "miyang-common";
interface GB {
    showErr(msg?: string, err?: Error): false
    showToast(msg: string): undefined
    loading(msg: string | false): undefined
    getUserInfo(): Object,
    getPlatform(): Promise<'ios' | 'android' | 'mac' | 'windows' | 'linux'>,
    showModal(option: {
        title: string,
        content: string,
        showCancel: boolean,
        cancelText: string,
        cancelColor: string,
        confirmText: string,
        confirmColor: string,
    }): Promise<boolean | null>
}
interface DB {
    app_config: string,
    images: string,
    mark_collection: string,
    mark_point: string,
    participation_collection: string,
    sys_config: string,
    user_info: string,
}
interface Uni {
    db: DB
    gb: GB
}
