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
  allContentsGetter: (state): IContent[] => state.allContents,
  contentGetter: (state): IContent => state.content,
  orderbyDateGetter: (state): IContent[] => {
    const contentsSorted = [...state.allContents]
    contentsSorted.sort((dateA, dateB) => dateA.created_at - dateB.created_at)
    return contentsSorted
  },

  orderbyDateMinorGetter: (state): IContent[] => {
    const contentsSorted = [...state.allContents]
    contentsSorted.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    return contentsSorted
  },
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
