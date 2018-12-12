<template>
    <div id="home">
        <div class="container">
            <div class="content">
            <h1>Sydeny</h1>
            <p>this is for Test</p>
            </div>
        </div>
    </div>
</template>
<script>
    
</script>
<style scope>
    #home{
        width: 100%;
        height: 100%;
        background:url(../assets/build.jpg) no-repeat center center;
        background-size: 100% 100%;
        /* filter: opacity(10%); */
        opacity: .7;
        position: relative;
        z-index: -1;
    }    
    .container{
        /* position: absolute; */
        background: rgb(5, 5, 5);
        opacity: .6;
        width: 100%;
        height: 100%;
        margin: 0;
    }
    .content{        
        font-size: 40px;
        color: white;
        padding: 6px;
    }
    .content h1{
        margin: 10px;
    }
    .content p{
        font-size: 25px;
        padding: 6px;
        margin: 10px;
    }
</style>