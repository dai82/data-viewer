<template>
  <!--特にレイアウトの指定がなければデフォルトで開く -->
  <v-app dark>
    <v-navigation-drawer
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(board, i) in dvBoardMstList"
          :key="i"
          :to="getDashboardLink(board.boardId)"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="board.boardId" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
      <v-btn icon @click="jumpMasterMaintePage()">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click="clearAddDashboardData()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer app>
      <span> Version: {{ version }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import CommonRepository from '~/repository/common'
import { DvBoardMst } from '~/model/Master'
export default Vue.extend({
  components: {
  },
  data (): {
    title: string;
    right: boolean;
    dvBoardMstList: DvBoardMst[];
  } {
    return {
      title: 'Data Viewer',
      right: false,
      dvBoardMstList: []
    }
  },
  computed: {
    version(): string {
      if (process.env.version) {
        return process.env.version
      }
      return "[No version]"
    }
  },
  async mounted() {
      await this.loadDvBoardMst()
  },
  methods: {
    async loadDvBoardMst(): Promise<void> {
      this.dvBoardMstList = await CommonRepository.getAllDvBoardMst()
    },
    getDashboardLink(boardId: string): string {
      return '/info/dashboard?boardId=' + boardId
    },
    jumpMasterMaintePage(): void {
      this.$router.push('/master/dashboard-list')
    },
    // 開発用。全てのデータ消す危なすぎるコマンドなので、本番リリース時には消す
    async clearAddDashboardData(): Promise<void> {
      await CommonRepository.clearAddDashboardData()
      await this.loadDvBoardMst()
    }
  }
})
</script>
