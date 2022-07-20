import api from '../../api/contentsApi'
import ContentService from '../../services/contents'
import {
  responseAllContents,
  responseContent,
} from '../../mocks/responseApiMock'

const mockAxiosPost = jest.spyOn(api, 'post')

describe('Service content.ts', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should return the list of contents successfully', async () => {
    const response = { status: 200, data: { responseAllContents } }

    mockAxiosPost.mockImplementationOnce(() => Promise.resolve(response))

    const mock = await ContentService.fetchAllContents()

    expect(mock).toEqual(response)
    expect(api.post).toHaveBeenCalledTimes(1)
  })

  test('should return a specific content by id', async () => {
    const response = { status: 200, data: { responseContent } }

    mockAxiosPost.mockImplementationOnce(() => Promise.resolve(response))

    const mock = await api.post('', {
      query: `query{
               getContent(id: "5d3bb1f7-0106-4733-aede-6a3c1c7f21c8"){
                   id,title,type,url,embeddable,allow_download,description,created_at, updated_at
              }
          }`,
    })

    expect(mock).toEqual(response)
  })
})
