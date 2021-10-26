<!--
 * @Descripttion: 
 * @Author: 林舒恒
 * @Date: 2021-05-31 20:38:44
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-10-09 18:39:32
-->
<docs>
    🚀从这里开始渲染
</docs>

<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'App',
        mounted() {
            let mockKeyboardEvent = new KeyboardEvent('keydown', { ctrlKey: true });
            document.dispatchEvent(mockKeyboardEvent);

            let mockClickEvent = new MouseEvent('click', );
            document.dispatchEvent(mockClickEvent);
        }
    }
</script>

<style scoped>
    #app { 
        overflow: auto; /** 防止缩小的时候背景显示不完全 */
    }
</style>

<style>
</style>

