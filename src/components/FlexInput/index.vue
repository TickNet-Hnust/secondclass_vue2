<!-- 
    @description: 基于el-input的二次封装(弃用)
    @anthor: lsh
    @createTime: 2021.6.19
    @lastModifyBy: lsh
    @lastModifyTime: 2021.6.19
-->
<template>
    <div class="flexInput">
        <Input
            :value="value"
            @input="handleInput"
            :disable="disable"
            :suffixIcon="suffixIcon"
            :prefixIcon="prefixIcon"
            :clearable="clearable"
        ></Input>
    </div>
</template>

<script>
    import { Input } from 'element-ui'
    export default {
        name: 'FlexInput',
        components: {
            Input
        },
        props: {
            /* 拓展属性 */
            width: {
                type: String,
                require: true
            },
            height: {
                type: String,
                defalut: '30px'
            },
            /* 代理属性 */
            value: [String, Number],
            disable: {
                type: [Boolean],
                defalut: false
            },
            suffixIcon: {
                type: String,
                defalult: null
            },
            prefixIcon: {
                type: String,
                defalult: null
            },
            clearable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {}
        },
        methods: {
            handleInput(event) {
                this.$emit('input', event.target.value)
            }
        },
        mounted() {
            let options = {
                width: this.width,
                height: this.height
            }
            let flexInput = document.querySelector('.flexInput')
            let input = document.querySelector('.flexInput .el-input__inner')
            console.log(input)
            Object.assign(input.style, options)
            // Object.assign(flexInput.style,options)
        }
    }
</script>

<style lang="sass" scoped></style>
