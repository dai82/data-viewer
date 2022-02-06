export class VueElement {
    public constructor(key?: string, value?: string) {
        this.key = key || ''
        this.value = value || ''
        this.children = []
    };

    public key: string = ''
    public value: string = ''
    public defaultKb: number = 0 // 0:not_default, 1:default
    public activeFlg: number = 1 // 0:not_active, 1:active
    public type: string = ''
    public children: VueElement[] = []
}
export class SelectElement {
    public key: string = ''
    public value: string = ''
    public defaultKb: number = -1
    public activeFlg: number = -1
    public param?: {[key: string]: unknown}
    public disabled: boolean = false

    public constructor(key: string = '', value: string = '', defaultKb: number = -1, activeFlg: number = -1) {
        this.key = key
        this.value = value
        this.defaultKb = defaultKb
        this.activeFlg = activeFlg
    }

    public static make(key: string, value: string): SelectElement {
        return new SelectElement(key, value)
    }
}
