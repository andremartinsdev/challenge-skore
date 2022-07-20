import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ContentService from '../../services/contents'
import { IContentState, IContent } from '~/common/types/content'

export const state = (): IContentState => ({
  allContents: [],
  content: {
    id: '',
    title: '',
    type: '',
    url: '',
    embeddable: false,
    allow_download: false,
    description: '',
    created_at: 0,
    updated_at: 0,
  },
  loadingAllContents: false,
  loadingContent: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  allContents: (state): IContent[] => state.allContents,
  content: (state): IContent => state.content,
}

export const mutations: MutationTree<RootState> = {
  SET_ALL_CONTENTS: (state, allContents: IContent[]) => {
    state.allContents = allContents
  },

  SET_CONTENT: (state, content: IContent) => {
    state.content = content
  },

  SET_LOADING_CONTENT: (state, loading: boolean) => {
    state.loadingContent = loading
  },

  SET_LOADING_ALL_CONTENTS: (state, loading: boolean) => {
    state.loadingAllContents = loading
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async getAllContents({ commit }) {
    try {
      commit('SET_LOADING_ALL_CONTENTS', true)
      const { data } = await ContentService.fetchAllContents()
      commit('SET_ALL_CONTENTS', data.data.contents)
    } catch (error) {
      alert(error)
    } finally {
      commit('SET_LOADING_ALL_CONTENTS', false)
    }
  },

  async getContentId({ commit }, idContent: string) {
    try {
      commit('SET_LOADING_CONTENT', true)
      const { data } = await ContentService.fetchContentId(idContent)
      commit('SET_CONTENT', data.data.getContent)
    } catch (error) {
      alert(error)
    } finally {
      commit('SET_LOADING_CONTENT', false)
    }
  },
}
