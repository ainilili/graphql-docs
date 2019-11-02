<template>
  <div>
      <div class="menu">
        <Menu :theme="theme3" active-name="3" :open-names="['1','2']" @on-select="jumpToProjectManager" class="menu" width="100%">
          <Input v-model="schemaTitleFilter" placeholder="搜索" style="margin-left: 5%; width:90%" />
          <Submenu name="1" >
            <template slot="title">
                <Icon type="ios-analytics" />
                Query
            </template>
            <template v-for="(api, index) of queryApis">
              <MenuItem :name="api.name" v-if="schemaTitleFilter == '' || api.name.toLowerCase().indexOf(schemaTitleFilter.toLowerCase()) != -1 || api.description.toLowerCase().indexOf(schemaTitleFilter.toLowerCase()) != -1">
                  <div class="api-name">
                    <Icon type="md-recording" />
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
              <MenuItem :name="api.name" v-if="schemaTitleFilter == '' || api.name.toLowerCase().indexOf(schemaTitleFilter.toLowerCase()) != -1 || api.description.toLowerCase().indexOf(schemaTitleFilter.toLowerCase()) != -1">
                  <div class="api-name">
                    <Icon type="md-send" />
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
        <div style="padding:0 100px">
          <Divider>请求参数</Divider>
          <Table stripe :columns="apiInfo.reqInfo.columns" :data="apiInfo.reqInfo.data"></Table>
          <Divider>响应参数</Divider>
          <Table stripe :columns="apiInfo.respInfo.columns" :data="apiInfo.respInfo.data"></Table>
        </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import expandRow from './TableExpand.vue';
  var app = null;
  export default {
      components: { expandRow },
      data () {
          return {
            theme3: 'light',
            queryApis: [],
            queryApiMap:{},
            mutationApis: [],
            mutationApiMap:{},
            schemaMap:{},
            schemaTitleFilter:'',
            apiInfo:{
              reqInfo:{
                columns: [
                    {
                      type: 'expand',
                      width: 50,
                      render: (h, params) => {
                          return h(expandRow, {
                              props: {
                                  row: params.row
                              }
                          })
                      }
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Type',
                        key: 'type'
                    },
                    {
                        title: 'Desc',
                        key: 'desc'
                    }
                ],
                data: [ ]
              },
              respInfo:{
                columns:[
                    {
                      type: 'expand',
                      width: 50,
                      render: (h, params) => {
                          return h(expandRow, {
                              props: {
                                  row: params.row
                              }
                          })
                      }
                    },
                    {
                        title: 'Type',
                        key: 'type'
                    },
                    {
                        title: 'Desc',
                        key: 'desc'
                    }
                ],
                data: [ ]
              }
            }
          }
      },
      methods:{
        jumpToProjectManager(e){
          //clear
          app.apiInfo.reqInfo.data = []
          app.apiInfo.respInfo.data = []

          var api = app.queryApiMap[e]
          if(! api){
            api = app.mutationApiMap[e]
          }
          var args = api.args
          if(args.length > 0){
            for( var i = 0; i <args.length; i ++){
              var arg = args[i]
              var argName = arg.name
              var data = app.parseGraphqlArgType(arg.type)
              data.name = argName
              app.apiInfo.reqInfo.data.push(data)
            }
          }

          var respType = api.type
          if(respType){
            var data = app.parseGraphqlArgType(respType)
            app.apiInfo.respInfo.data.push(data)
          }

        },
        parseGraphqlArgType(argType){
          var argTypeName = argType.name
          var argName = ""
          if(argType.ofType){
            argTypeName = argType.ofType.name
          }
          var schemaObj = app.schemaMap[argTypeName]
          var typeName = expandRow.methods.parserSchemaType(argType)

          var fields = schemaObj.inputFields
          if (! fields || fields.length == 0){
            fields = schemaObj.fields
          }

          return {
            type: typeName,
            desc: schemaObj.description,
            fields: fields,
            // schemaMap: app.schemaMap,
            _disableExpand: ! fields || fields.length == 0
          }
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
              app.queryApis = app.schemaMap["Query"].fields
              for(var i = 0; i <  app.queryApis.length; i ++){
                var api =  app.queryApis[i]
                app.queryApiMap[api.name] = api
              }
              app.mutationApis = app.schemaMap["Mutation"].fields
              for(var i = 0; i <  app.mutationApis.length; i ++){
                var api =  app.mutationApis[i]
                app.mutationApiMap[api.name] = api
              }

              localStorage.setItem('schemaMap', JSON.stringify(app.schemaMap))
          })
          .catch(function (error) {
              app.$Message.error('err: ' + error);
          });
        }
      },
      created(){
        app = this
        localStorage.clear();
        this.getGraphqlSchemaInfos(app.$route.query.endpoint)
      }
  }
</script>
<style scoped>
.menu {
  float:left;
  width: 20%;
  height:1000px; 
  LINE-HEIGHT: 20px; 
  OVERFLOW: auto;
}
.menu .api-name{}
.menu .api-desc{margin-top: 10px; color: #888; font-size: 13px}
.info {width: 80%; overflow:right; height:auto; overflow:hidden}
</style>