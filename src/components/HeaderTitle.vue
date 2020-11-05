<template>
    <div class="header-title">
        {{title}}
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String
        }
    }
}
</script>

<style lang="scss" scoped>
    .header-title{
        margin: 36px 0 18px 0;
        font-weight: 700;
        font-size: 30px;
    }
</style>