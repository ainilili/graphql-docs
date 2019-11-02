<template>
  <div>
      <Input v-model="graphqlEndPointer" placeholder="Graphql End Pointer" style="margin:0 auto; margin-top: 18%; width:60%" search enter-button="Connect" @on-enter="jumpToHome" @on-search="jumpToHome"/>
  </div>
</template>
<script>
  import axios from 'axios'
  var app = null;
  export default {
      data () {
          return {
            graphqlEndPointer:'',
          }
      },
      methods:{
        jumpToHome(){
            if(app.graphqlEndPointer == ''){
                app.$Message.error("请输入graphql端口地址")
                return
            }
            axios({
                url: app.graphqlEndPointer,
                method: 'post',
                data: app.SCHEMA_QUERY,
                headers:{
                'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                localStorage.setItem('endpoint', app.graphqlEndPointer)
                app.$router.push({name:'Home', query:{endpoint: app.graphqlEndPointer}})
            })
            .catch(function (error) {
                app.$Message.error('endpoint err: ' + error);
            });
        }
      },
      created(){
        app = this
        app.graphqlEndPointer = localStorage.getItem('endpoint')
      }
  }
</script>
<style scoped>

</style>