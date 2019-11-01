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
                    <span class="expand-key">Job: </span>
                    <span class="expand-value">{{ field.name }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">Interest: </span>
                    <span class="expand-value">{{ row.interest }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">Birthday: </span>
                    <span class="expand-value">{{ row.birthday }}</span>
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