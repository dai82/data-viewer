const algorithm = 'SHA-256'
/*
    "SHA-1";
    "SHA-256";
    "SHA-384";
    "SHA-512";
*/
function hashBlob(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject): void => {
        const fileReader = new FileReader()
        const funcHash = (): void => {
            crypto.subtle.digest(algorithm, fileReader.result as ArrayBuffer).then((buffer): any => {
                const typedArray = new Uint8Array(buffer)
                const rst = Array.prototype.map.call(typedArray, (x: number): string => ('00' + x.toString(16)).slice(-2)).join('')
                resolve(rst)
            })
        }
        fileReader.addEventListener('load', funcHash)
        fileReader.addEventListener('error', (): void => reject(fileReader.error))
        fileReader.readAsArrayBuffer(blob)
    })
}

export class AttachedFile {
    public fileName = ''
    public fileExtension = ''
    public size = 0
    public sizeString = ''
    public hash = ''
    public prcDate = ''
    public file: File | null = null
    public db = false
    public dbDelFlg = false

    public constructor(file?: File) {
        if (!file) {
            return // 初期化の時にはコンストラクタにfileを指定しないでも開ける。
        }
        this.fileName = file.name
        this.size = file.size
        if (file !== null) {
            hashBlob(file).then((h: string): void => { this.hash = h })
            this.file = file
        }
        const ext = file.name.split('.').pop()
        this.fileExtension = ext || ''
    }
}
