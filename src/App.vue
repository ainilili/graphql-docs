<template>
  <div id="app">
    <div class="banner" >
        <h2 style="float:left;cursor:pointer" @click="jumpToInlet">Graphql Docs</h2>
    </div>
    <router-view class="router-view"/>
  </div>
</template>

<script>
var app = null
export default {
  name: 'App',
  data (){
    return {
     
    }
  },
  methods: {
   jumpToInlet(){
      app.$router.push({name:'Inlet'})
   }
  },
  created (){
    app = this
  },
  watch: {
    "$route": function (to, from) {
      this.nickname = localStorage.getItem("nickname")
      this.token = localStorage.getItem("token")
      console.log("watch")
　　}
  }
}
</script>

<style>
.banner {width: 100%; padding: 10px 20px; overflow: hidden}
.banner .banner-item {float: right; margin-right: 20px;line-height:35px;cursor:pointer}
</style>
