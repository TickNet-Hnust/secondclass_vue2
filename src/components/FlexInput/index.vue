<template>
    <div>
        <!-- <elInput :width="width"></elInput> -->
        <span :width="width"></span>
    </div>
</template>

<script>
import elInput from 'element-ui'
export default {
    name: 'FlexInput',
    props: {
        width: {
            type: String,
            // require: true
        },
        height: {
            type: String,
            defalut: '40'
        }
    },
    components: {
        elInput
    }
}
</script>

<style lang="sass" scoped>

</style>