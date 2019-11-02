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
                app.$router.push({name:'Home', params:{endpoint: app.graphqlEndPointer}})
            })
            .catch(function (error) {
                app.$Message.error('endpoint err: ' + error);
            });
        }
      },
      created(){
        app = this
      }
  }
</script>
<style scoped>

</style>