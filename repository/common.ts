import FormData from 'form-data'
import { AttachedFile } from '~/model/file/AttachedFile'
import Repository from "~/repository/Repository";
import { DvBoardMst } from '~/model/Master'

export default {
    async getAllDvBoardMst(): Promise<DvBoardMst[]> {
        return await Repository.get('/all-dv-board-mst')
            .then((res): DvBoardMst[] => {
                if (res.data.status && res.data.status === 'SUCCESS') {
                    const targetList = res.data.result.dvBoardMstList as DvBoardMst[]
                    return targetList
                }
                return []
            })
            .catch((): DvBoardMst[] => {
                return []
            })
    },
    multipartConfig: {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
    /**
     * csvファイルをアップロードしてdashboardデータを登録します。
     * @param files 
     * @returns 
     */
    async dashboardRegisterbyFile(files: AttachedFile[]): Promise<boolean> {
        const req = new FormData()
        // 事前チェックでエラーがあればファイル登録はしない
        console.log(JSON.stringify(files))
        if (!this.preRegistCheck(files)) {
            return Promise.resolve(false)
        }
        for (const f of files) {
            if (f.size > 0) {
                req.append(f.hash, f.file)
            }
        }
        req.append("type", "csv")
        const result = await Repository.post('/init-register', req, this.multipartConfig)
            .then(res => {
                if (res.data.result === 'SUCCESS') {
                    return true
                }
                return false
            }).catch(e => {
                // eslint-disable-next-line no-console
                console.error(e.toString())
                return false
            })
        return result 
    },
    preRegistCheck(fileList: AttachedFile[]): boolean {
        for (const f of fileList) {
            const file = f.file
            if (!file || f.size === 0) {
                // eslint-disable-next-line no-console
                console.warn('空添付ファイル：', f.fileName)
                return false
            }
            if (f.db) {
                // DBから取得したものはチェックの必要はない
                // eslint-disable-next-line no-console
                console.info('DBから取得したファイル：', f.fileName)
            }
        }
        return true
    },
    /**
     * csvファイルをアップロードしてdashboardデータを登録します。
     * @param files 
     * @returns 
     */
    async clearAddDashboardData(): Promise<boolean> {
        return await Repository.post('/clear-all-dashboard-data')
            .then((res): boolean => {
                if (res.data.status && res.data.status === 'SUCCESS') {
                    return true
                }
                return false
            })
            .catch((): boolean => {
                return false
            })
    }
}