import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import ListContents from '../../components/ListContents.vue'
import { state } from '../../store/Contents/index'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ListContents.vue', () => {
  let actions
  let store
  let getters

  beforeEach(() => {
    actions = {
      getAllContents: jest.fn(),
    }
    getters = {
      allContentsGetter: jest.fn().mockReturnValue([
        {
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
      ]),
      orderbyDateGetter: jest.fn(),
      orderbyDateMinorGetter: jest.fn(),
    }
    store = new Store({
      modules: {
        Contents: {
          namespaced: true,
          actions,
          getters,
          state,
        },
      },
    })
  })

  it('should render ListContents', () => {
    const wrapper = shallowMount(ListContents, {
      store,
      localVue,
      stubs: { NuxtLink: RouterLinkStub },
    })
    expect(wrapper.find('.content-container').isVisible()).toBe(true)
  })
})
