<template>
    <span class="tag-button">
        {{tagName}}
    </span>
</template>

<script>
export default {
    props:['tagName']
}
</script>

<style lang="scss" scoped>
    .tag-button{
        display: inline-block;
        font-size: 18px;
        font-weight: 600;
        padding: 10px;
        background-color: #f5f5f7;
        color:#7a7a7b;
        border-radius: 8px;

        &:hover{
            background-color: #eaeffd;
            color:#335eea;
        }
    }
</style>