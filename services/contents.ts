import { AxiosResponse } from 'axios'
import api from '../api/contentsApi'

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

interface IResponseAllContents {
  data: IResponseContents
}

export interface IResponseContents {
  contents: IContent
}

interface IResponseContentId {
  data: IContentId
}

export interface IContentId {
  getContent: IContent[]
}

class ContentService {
  fetchAllContents(): Promise<AxiosResponse<IResponseAllContents>> {
    return api.post('', {
      query: `query{
            contents{id,title,type,url,embeddable,allow_download,description,created_at, updated_at}
          }`,
    })
  }

  fetchContentId(
    idContent: string
  ): Promise<AxiosResponse<IResponseContentId>> {
    return api.post('', {
      query: `query{
                 getContent(id: "${idContent}"){
                     id,title,type,url,embeddable,allow_download,description,created_at, updated_at
                }
            }`,
    })
  }
}

export default new ContentService()
