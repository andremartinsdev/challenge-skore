export interface IResponseAllContents {
  data: IResponseContents
}

interface IResponseContents {
  contents: IContent
}

export interface IResponseContentId {
  data: IContentId
}

interface IContentId {
  getContent: IContent[]
}

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

export interface IContentState {
  allContents: IContent[]
  content: IContent
  loadingAllContents: boolean
  loadingContent: boolean
}
