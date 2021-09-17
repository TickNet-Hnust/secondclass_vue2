<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-05-31 20:38:44
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-09-17 18:53:39
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted() {
            
        }
    }
</script>

<style scoped>
    #app { 
        overflow: auto; /** 防止缩小的时候背景显示不完全 */
    }
</style>
