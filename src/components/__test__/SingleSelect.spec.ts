import { mount } from '@vue/test-utils'
import SingleSelect from '../shared/SingleSelect/SingleSelect.vue'
import { describe, it, expect } from 'vitest'
;(global as any).IntersectionObserver = class IntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

describe('SingleSelect', () => {
  it('renders the placeholder when no option is selected', async () => {
    const wrapper = mount(SingleSelect, {
      props: {
        placeholder: 'Select an option',
        options: [],
        clearable: true
      }
    })

    expect(wrapper.find('[data-test="selected-option"]').text()).toBe('Select an option')
  })

  it('opens the options list when clicked', async () => {
    const wrapper = mount(SingleSelect, {
      props: {
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' }
        ],
        clearable: true
      }
    })

    await wrapper.find('[data-test="select-toggle"]').trigger('click')

    expect(wrapper.find('[data-test="option-list"]').isVisible()).toBe(true)
  })

  it('selects an option when clicked', async () => {
    const wrapper = mount(SingleSelect, {
      props: {
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' }
        ],
        clearable: true
      }
    })

    await wrapper.find('[data-test="select-toggle"]').trigger('click')
    await wrapper.find('[data-test="option-list"] li:first-child').trigger('click')

    expect(wrapper.find('[data-test="selected-option"]').text()).toBe('Option 1')
  })

  it('clears the selection when clear button is clicked', async () => {
    const wrapper = mount(SingleSelect, {
      props: {
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' }
        ],
        clearable: true
      }
    })

    await wrapper.find('[data-test="select-toggle"]').trigger('click')
    await wrapper.find('[data-test="option-list"] li:first-child').trigger('click')

    expect(wrapper.find('[data-test="selected-option"]').text()).toBe('Option 1')

    await wrapper.find('[data-test="clear-button"]').trigger('click')

    expect(wrapper.find('[data-test="selected-option"]').text()).toBe('Select an option')
  })
})
