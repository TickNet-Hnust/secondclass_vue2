<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-05-31 20:38:44
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-09-18 20:03:00
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import XScrollbar from 'x-scrollbar'
    export default {
        name: 'App',
        mounted() {
            new XScrollbar(document.querySelector('#app'))
        }
    }
</script>

<style scoped>
    #app { 
        overflow: auto; /** 防止缩小的时候背景显示不完全 */
    }
</style>
