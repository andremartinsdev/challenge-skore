import { AxiosResponse } from 'axios'
import api from '../api/contentsApi'
import { IResponseAllContents, IResponseContentId } from '~/common/types/content'

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
