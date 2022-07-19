import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header.vue'

describe('Header.vue', () => {
  it('should render Header', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper.find('.header-conteiner').isVisible()).toBe(true)
    expect(wrapper.find('.header-imagen').isVisible()).toBe(true)
  })

  it('should render header titles', () => {
    const wrapper = shallowMount(Header)

    expect(wrapper.text()).toContain('Conteúdos')
    expect(wrapper.text()).toContain('LGPD')
  })
})
