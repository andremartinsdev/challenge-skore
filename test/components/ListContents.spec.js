import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import ListContents from '../../components/ListContents.vue'
import { state } from '../../store/Contents/index'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ListContents.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      getAllContents: jest.fn(),
    }
    store = new Store({
      modules: {
        Contents: {
          namespaced: true,
          actions,
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
