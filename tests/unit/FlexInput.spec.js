import { shallowMount, mount } from '@vue/test-utils'
import FlexInput from '@/components/FlexInput/index.vue'

describe('FlexInput.vue', () => {
    it('renders props.msg when passed', () => {
        let width = '200'
        const wrapper = mount(FlexInput)

        it('is render width', () => {
            expect(wrapper.contains('span')).toBe(true)
        })
    })
})