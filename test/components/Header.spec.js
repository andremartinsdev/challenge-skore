import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header.vue'

describe('Header.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Header)
  })

  it('should render Header', () => {
    expect(wrapper.find('.header-conteiner').isVisible()).toBe(true)
  })

  it('should render Header', () => {
    expect(wrapper.text()).toContain('Conteúdos')
    expect(wrapper.text()).toContain('LGPD')
  })

  it('renders properly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
