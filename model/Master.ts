export class DvBoardMst {
    public boardId: string = ''
    public boardName: string = ''
    public active: boolean = false
    public displaySort: number = -1
    public fileName: string = ''
}

export class DvColumnMst {
    public boardId: string = ''
    public columnId: number = -1
    public columnName: string = ''
    public columnType: string = ''
}

export class DvDisplayMst {
    public boardTypeColumnMix: string = ''
    public boardId: string = ''
    public boardType: string = ''
    public columnId: number = -1
    public columnName: string = ''
    public columnType: string = ''
    public columnMode: string = ''
}