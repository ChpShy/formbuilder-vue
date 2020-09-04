<template>
    <div style="height: 100%">
        <div class="g-menu-wrap">
            <Menu mode="horizontal" :active-name="activeName" @on-select="routeLink">
                <MenuItem name="1">
                    表单列表
                </MenuItem>
                <MenuItem name="2">
                    表单新增
                </MenuItem>
                <MenuItem name="3">
                    变量列表
                </MenuItem>
                <MenuItem name="4">
                    标记解释
                </MenuItem>
            </Menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data() {
            return {
                activeName: ''
            }
        },
        mounted() {
            if(this.$route.name) {
                this.activeName = this.$route.name;
            }
            console.log(this.$route);
        },
        methods: {
            routeLink(num) {
                if (num) {
                    switch (num) {
                        case '1':
                            this.$router.push('/tableList');
                            break;
                        case '2':
                            this.$router.push('/form/add');
                            break;
                        case '3':
                            this.$router.push('/nameList');
                            break;
                        case '4':
                            this.$router.push('/tipList');
                            break;
                        default:
                            this.$router.push('/tableList');
                            break;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .g-menu-wrap {
        padding-left: 300px;
        background-color: #ffffff;
    }
</style>