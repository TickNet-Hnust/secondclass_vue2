<template>
    <div>
        <Menubar />
        <div
            style=" ;"
            :class="{ hasTagsView: needTagsView }"
            class="main-container"
        >
            <div :class="{ 'fixed-header': fixedHeader }">
                <!-- <navbar /> -->
                <tags-view v-if="needTagsView" />
            </div>
            <app-main />
            <right-panel v-if="showSettings">
                <settings />
            </right-panel>
        </div>
        <router-view ></router-view>
    </div>
</template>

<script>
import Menubar from '@/layout/components/Menubar/index.vue'
export default {
    name: 'erke',
    components: {
        
        Menubar
    }
}
</script>