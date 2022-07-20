import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import DetailsContent from '../../components/DetailsContent.vue'
import { state } from '../../store/Contents/index'

const $route = {
  params: '',
}
const localVue = createLocalVue()
localVue.use(Vuex)

describe('DetailsContent.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      getContentId: jest.fn(),
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

  it('should render Header', () => {
    const wrapper = shallowMount(DetailsContent, {
      store,
      localVue,
      stubs: { NuxtLink: RouterLinkStub },
      mocks: {
        $route,
      },
    })
    expect(wrapper.find('.content-container').isVisible()).toBe(true)
  })
})
