<template>
  <div>
      <div class="menu">
        <Menu :theme="theme3" active-name="3" @on-select="jumpToProjectManager" class="menu" width="100%">
          <Input v-model="schemaTitleFilter" placeholder="Enter something..." style="margin-left: 5%; width:90%" />
          <Submenu name="1" >
            <template slot="title">
                <Icon type="ios-analytics" />
                Query
            </template>
            <template v-for="(api, index) of queryApis">
              <MenuItem :name="api.name" v-if="schemaTitleFilter == '' || api.name.toLowerCase().indexOf(schemaTitleFilter.toLowerCase()) != -1">
                  <div class="api-name">
                    <Icon type="md-document" />
                    {{api.name}} 
                  </div>
                  <div class="api-desc">
                    {{api.description}}
                  </div>
              </MenuItem>
            </template>
          </Submenu>
          <Submenu name="2" open-names>
            <template slot="title">
                <Icon type="ios-analytics" />
                Mutation
            </template>
            <template v-for="(api, index) of mutationApis">
              <MenuItem :name="api.name" v-if="schemaTitleFilter == '' || api.name.toLowerCase().indexOf(schemaTitleFilter.toLowerCase()) != -1">
                  <div class="api-name">
                    <Icon type="md-document" />
                    {{api.name}} 
                  </div>
                  <div class="api-desc">
                    {{api.description}}
                  </div>
              </MenuItem>
            </template>
          </Submenu>
         
        </Menu>
      </div>
      <div class="info">
        <router-view class="router-view" style="margin:0 auto"/>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
  var app = null;
  export default {
      data () {
          return {
              theme3: 'light',
              queryApis: [],
              mutationApis: [],
              schemaMap:{},
              schemaTitleFilter:'',
          }
      },
      methods:{
        jumpToProjectManager(e){
          app.$router.push({name:'ApiInfo', params: { name: e }})
        },
        getGraphqlSchemaInfos(endpoint){
          axios({
            url: endpoint,
            method: 'post',
            data: app.SCHEMA_QUERY,
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then(function (response) {
              var resp = response.data
              var schemaTypes = resp.data.__schema.types
              for(var i = 0; i < schemaTypes.length; i ++){
                var schemaType = schemaTypes[i]
                app.schemaMap[schemaType.name] = schemaType

              }
              console.log(app.schemaMap)
              app.queryApis = app.schemaMap["Query"].fields
              app.mutationApis = app.schemaMap["Mutation"].fields
              console.log("13123123123")
              console.log(app.queryApis)
          })
          .catch(function (error) {
              app.$Message.error('err: ' + error);
          });
        }
      },
      created(){
        app = this
        // this.jumpToProjectManager(3)
        this.getGraphqlSchemaInfos('http://api.bjx.cloud/api/task')
      }
  }
</script>
<style scoped>
.menu {float:left; width: 20%}
.menu .api-name{}
.menu .api-desc{margin-top: 10px; color: #888; font-size: 13px}
.info {float:right; width: 80%;}
</style>