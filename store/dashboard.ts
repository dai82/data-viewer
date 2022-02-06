/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue'
import Vuex from 'vuex'
import { DvBoardMst } from '~/model/Master'

Vue.use(Vuex)

export interface State {
    dvBoardMstList: DvBoardMst[];
}

export interface Context {
    commit: (name: string, payload?: any) => void;
}

export interface Mutations {
    [key: string]: (state: State, payload?: any) => void;
}

export interface Actions {
    [key: string]: (context: Context, payload?: any) => void;
}

export interface Getters {
    getDvBoardMstList: (state: State) => DvBoardMst[];
}

export const state = (): State => {
    return {
        dvBoardMstList: []
    }
}

export const getters: Getters = {
    getDvBoardMstList(state: State): DvBoardMst[] {
        return state.dvBoardMstList
    }
}

export const mutations: Mutations = {
    setDvBoardMstList(state: State, object: { dvBoardMstList: DvBoardMst[] }): void {
        state.dvBoardMstList = object.dvBoardMstList
    }
}

export const actions: Actions = {
    getDvBoardMstList({ commit }, object: { dvBoardMstList: DvBoardMst[] }): void {
        commit('setDvBoardMstList', object)
    }
}
