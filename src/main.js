// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
// Vue.prototype.HOST = 'http://39.105.65.8:8888'
Vue.prototype.HOST = 'http://127.0.0.1:8888'

Vue.prototype.SCHEMA_QUERY = '{"operationName":"IntrospectionQuery","variables":{},"query":"query IntrospectionQuery {\\n  __schema {\\n    queryType {\\n      name\\n    }\\n    mutationType {\\n      name\\n    }\\n    subscriptionType {\\n      name\\n    }\\n    types {\\n      ...FullType\\n    }\\n    directives {\\n      name\\n      description\\n      locations\\n      args {\\n        ...InputValue\\n      }\\n    }\\n  }\\n}\\n\\nfragment FullType on __Type {\\n  kind\\n  name\\n  description\\n  fields(includeDeprecated: true) {\\n    name\\n    description\\n    args {\\n      ...InputValue\\n    }\\n    type {\\n      ...TypeRef\\n    }\\n    isDeprecated\\n    deprecationReason\\n  }\\n  inputFields {\\n    ...InputValue\\n  }\\n  interfaces {\\n    ...TypeRef\\n  }\\n  enumValues(includeDeprecated: true) {\\n    name\\n    description\\n    isDeprecated\\n    deprecationReason\\n  }\\n  possibleTypes {\\n    ...TypeRef\\n  }\\n}\\n\\nfragment InputValue on __InputValue {\\n  name\\n  description\\n  type {\\n    ...TypeRef\\n  }\\n  defaultValue\\n}\\n\\nfragment TypeRef on __Type {\\n  kind\\n  name\\n  ofType {\\n    kind\\n    name\\n    ofType {\\n      kind\\n      name\\n      ofType {\\n        kind\\n        name\\n        ofType {\\n          kind\\n          name\\n          ofType {\\n            kind\\n            name\\n            ofType {\\n              kind\\n              name\\n              ofType {\\n                kind\\n                name\\n              }\\n            }\\n          }\\n        }\\n      }\\n    }\\n  }\\n}\\n"}'

Vue.prototype.parserSchemaType = function(type){
  var required = type.kind == 'NON_NULL'
  var isList = type.kind === 'LIST'
  var typeName = ""

  if(type.ofType && type.ofType.ofType){
    typeName =  type.ofType.ofType.name
  }else if(type.ofType){
    typeName = type.ofType.name
  }else{
    typeName = type.name
  }
 
  return (isList ? "[] " : "") + typeName + (required ? " !" : "")
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

const service = axios.create({
  timeout: 1000 * 30,
  // 允许跨域带token
  withCredentials: true
})

service.interceptors.request.use(
  (config) => {
    config.headers['token'] = localStorage.getItem("token");
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

  service.interceptors.response.use(response => {
    console.log("test")
    // if (response.data && response.data.code === 511) { // 401, token失效
      
    //   localStorage.removeItem("token")
    //   router.push({name: 'Login'})
    // }
    return response
  }, error => {
    return Promise.reject(error)
  })
