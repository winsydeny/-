<template>
    <div id="notfound">
        <h1>404!</h1>
        <p>页面丢失了</p>
    </div>
</template>
<script>
export default{
    name:'notfound',
}
</script>
<style scoped>
#notfound{
   position: absolute;
   width: 100%;
   height: 200px;
   top: 50%;
   transform: translate(0,-200px);
}
#notfound h1{
    font-size: 100px;
    line-height: 200px;
}
#notfound p{
    font-size: 30px;
}
</style>
