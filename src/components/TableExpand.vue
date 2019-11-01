<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <template v-for="(field, index) of row.fields">
            <Row class="expand-row">
                <Col span="8">
                    <span class="expand-key">name: </span>
                    <span class="expand-value">{{ field.name }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">type: </span>
                    <span class="expand-value">{{ field.description }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">desc: </span>
                    <span class="expand-value">{{ field.type }}</span>
                </Col>
            </Row>
        </template>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>