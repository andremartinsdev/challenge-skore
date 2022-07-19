import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import ContentService from '../../services/contents'
export interface IContent {
  id: string
  title: string
  type: string
  url: string
  embeddable: boolean
  allow_download: boolean
  description: string
  created_at: number
  updated_at: number
}

@Module({
  name: 'Contents',
  stateFactory: true,
  namespaced: true,
})
export default class MyModule extends VuexModule {
  allContents: IContent[] = []
  content: IContent = {
    id: '',
    title: '',
    type: '',
    url: '',
    embeddable: false,
    allow_download: false,
    description: '',
    created_at: 0,
    updated_at: 0,
  }

  loadingAllContents: boolean = false
  loadingContent: boolean = false

  @Mutation
  SET_ALL_CONTENTS(contents: IContent[]) {
    this.allContents = contents
  }

  @Mutation
  SET_CONTENT(content: IContent) {
    this.content = content
  }

  @Mutation
  SET_LOADING_CONTENT(loading: boolean) {
    this.loadingContent = loading
  }

  @Mutation
  SET_LOADING_ALL_CONTENTS(loading: boolean) {
    this.loadingAllContents = loading
  }

  get getterAllContents() {
    return this.allContents
  }

  @Action({ commit: 'SET_ALL_CONTENTS' })
  async getAllContents() {
    try {
      this.context.commit('SET_LOADING_ALL_CONTENTS', true)
      const { data } = await ContentService.fetchAllContents()
      return data.data.contents
    } catch (error) {
      alert(error)
    } finally {
      this.context.commit('SET_LOADING_ALL_CONTENTS', false)
    }
  }

  @Action({ commit: 'SET_CONTENT' })
  async getContentId(idContent: string) {
    try {
      this.context.commit('SET_LOADING_CONTENT', true)
      const { data } = await ContentService.fetchContentId(idContent)
      return data.data.getContent
    } catch (error) {
      alert(error)
    } finally {
      this.context.commit('SET_LOADING_CONTENT', false)
    }
  }
}
