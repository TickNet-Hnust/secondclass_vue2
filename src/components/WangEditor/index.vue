<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-08-26 21:10:02
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-26 22:08:25
-->
<template>
    <div :id="id">
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    props:{
        id:{
            value: String,
            default: ''
        },
        value:{
            type: String,
            default: ''
        }
    },
    data(){
        return {

        }
    },
    mounted() {
        const editor = new E(document.getElementById(this.id))
        editor.config.height = 200
        editor.config.uploadImgShowBase64 = true
        editor.config.onchange = (newHtml) =>{
            console.log(newHtml)
            this.$emit('change',newHtml)
        };
        editor.create()
        
    }
}
</script>

<style scoped>

</style>