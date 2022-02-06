import { Store } from 'vuex'
import Repository from '../repository/common'

export default async ({ store }: {store: Store<any>}): Promise<void> => {
    if (store.state.dashboard.dvBoardMstList && store.state.dashboard.dvBoardMstList.length === 0) {
        // dv_board_mstの全データを取得する
        const dvBoardMstList = await Repository.getAllDvBoardMst()
        await store.dispatch('dashboard/getDvBoardMstList', dvBoardMstList)
    }
}