<style scoped>
    .expand-row{
        margin-bottom: 0px;
        padding: 5px 5px;
        cursor: pointer;
    }
    .expand-row:hover {background: #eee}
</style>
<template>
    <div>
        <Table stripe :columns="columns" :data="data"></Table>
        <!-- template v-for="(field, index) of row.fields">
            <Row class="expand-row" >
                <Col span="8">
                    <span class="expand-key"></span>
                    <span class="expand-value">{{ field.name }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key"></span>
                    <span class="expand-value">{{ parserSchemaType(field.type)}}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key"> </span>
                    <span class="expand-value">{{ field.description }}</span>
                </Col>
            </Row>
        </template -->
    </div>
</template>
<script>
    import expandRow from './TableExpand.vue';
    var app = null
    export default {
        props: {
            row: Object
        },
        data(){
            return {
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
                data: []
            }
        },
        methods: {
            parserSchemaType(type){
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
        },
        created(){
            app = this
            if (app.row.fields){
                for (var i = 0; i < app.row.fields.length; i ++){
                    var field = app.row.fields[i]
                    var typeName = app.parserSchemaType(field.type)

                    var argType = field.type
                    var argTypeName = argType.name
                    if(argType.ofType && argType.ofType.ofType){
                        argTypeName = argType.ofType.ofType.name
                    }else if (argType.ofType){
                        argTypeName = argType.ofType.name
                    }
                    console.log("f", field)
                    console.log(1, argTypeName)
                    console.log(2,app.row)
                    var schemaObj = app.row.schemaMap[argTypeName]
                    console.log(3,schemaObj)

                    var fields = schemaObj.inputFields
                    if (! fields || fields.length == 0){
                        fields = schemaObj.fields
                    }

                    app.data.push({
                        name: field.name,
                        type: typeName,
                        desc: field.description,
                        fields: fields,
                        _disableExpand: ! fields || fields.length == 0,
                        schemaMap: app.row.schemaMap,
                    })
                }
            }
        }
    };
</script>