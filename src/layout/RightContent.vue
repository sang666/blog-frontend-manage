<template>
    <div>
        <div class="content-title-box">右边内容</div>
        <div class="content-box">
                <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RightContent"
    }
</script>

<style scoped>
    .content-box{
        padding: 10px;
    }
.content-title-box{

    padding: 10px;
    border-bottom: solid 1px #e6e6e6;
}
</style>
