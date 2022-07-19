import { shallowMount } from '@vue/test-utils'
import Spinner from '../../components/Spinner.vue'

describe('Spinner.vue', () => {
  it('should render Spinner', () => {
    const wrapper = shallowMount(Spinner)
    expect(wrapper.find('.spinner').isVisible()).toBe(true)
    expect(wrapper.find('.dot').isVisible()).toBe(true)
  })
})
