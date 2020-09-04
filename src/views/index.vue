<template>
    <div>
        <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <a href="javascript:void(0);" @click="backEvent">点击我可以回去</a>
    </div>
</template>

<script>
    import Fetch from 'utils/fetch';
    export default {
        name: 'login',
        data() {
            return {
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: ''
            }
        },
        mounted () {
            //API·请求
            Fetch.axios({
                url: '',
                data: {},
                success: function(res){
                    _this.$Message.success(res.msg);
                },
                error: function(res) {
                    _this.$Message.error(res.msg);
                }
            });
        },
        methods: {
            backEvent() {
                this.$router.push("/");
            }
        }
    }
</script>
<style>

</style>
