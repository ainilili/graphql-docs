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
        <template v-for="(field, index) of row.fields">
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
        </template>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        methods: {
            parserSchemaType(type){
                console.log(type)
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
                console.log(isList)
            
                return (isList ? "[] " : "") + typeName + (required ? " !" : "")
            }
        }
    };
</script>