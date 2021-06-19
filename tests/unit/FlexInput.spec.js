import { shallowMount, mount } from '@vue/test-utils'
import FlexInput from '@/components/FlexInput/index.vue'

describe('FlexInput.vue', () => {
    let width = '200'
    const wrapper = mount(FlexInput)
    it('test style render', () => {
        console.log(wrapper.find('.flexInput'))
        expect(wrapper.html().find('.flexInput')).toBe(true)
    })
    it('is render width', () => {
        console.log(wrapper.html())
        expect(wrapper.find('input'))
    })
})
