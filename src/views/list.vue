<template>
    <div class="table-list" ref="tableView">
        <Button type="primary" @click="$router.push('/')" style="margin-top: 50px">新建表格</Button>
        <div v-for="(item, index) in tableData">
            <br>
            表名: {{item.name}} <br>
            表格：
            <div v-html="item.content"></div>
            <Button type="primary" style="margin-top: 50px" @click="$router.push({path: '/form/edit',query: {id: index}})">编辑</Button>
            <Button type="primary" style="margin-top: 50px" @click="submit(item)">提交</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                tableData: '',
                dataJson: {},
                rules: {}
            }
        },
        mounted() {
            var _this = this;
            this.tableData = JSON.parse(window.localStorage.getItem('tableData'));
            this.$nextTick(function () {
                var manifests = this.$refs.tableView.querySelectorAll('[manifest]');
                manifests.forEach(v => {
                    var manifest = v.getAttribute('manifest');
                    //radio和checkbox只需取一遍
                    if(v.nodeName === 'LABEL' && this.rules[manifest]) {
                        return;
                    }
                    this.dataJson[manifest] = '';
                    this.rules[manifest] = {};
                    this.rules[manifest].required = v.getAttribute('required');
                    this.rules[manifest].validate = v.getAttribute('validate');
                    this.rules[manifest].desc = v.getAttribute('desc');
                });
                console.log(this.dataJson);
                console.log(this.rules);
                this.$refs.tableView.onchange = function (e) {
                    var target = e.target || e.srcElement, name = target.name;
                    if (name) {
                        if(target.type == 'checkbox') {
                            var checkedIds = [];
                            var manifestNode = target.parentNode.parentNode, labels = manifestNode.children;
                            for(var i = 0; i< labels.length; i++) {
                                if(i != 'length') {
                                    var inputNode = labels[i].children[0];
                                    if(inputNode.checked) {
                                        checkedIds.push(inputNode.value);
                                    }
                                }
                            }
                            _this.dataJson[name] = checkedIds;
                        }else {
                            _this.dataJson[name] = target.value;
                        }
                        console.log(_this.dataJson[name]);
                    }
                };
            })
        },
        methods: {
            submit() {
                var valid = true;
                for (var i in this.rules) {
                    var value = this.dataJson[i], manifestNode = this.$refs.tableView.querySelector('[manifest=' + i + ']');
                    if (this.rules[i].required === 'true' && !value) {
                        valid = false;
                        if(manifestNode.className.indexOf('form_builder_error') === -1) {
                            manifestNode.className =  manifestNode.className + ' form_builder_error';
                        }
                    }else if(this.rules[i].validate) {
                        var reg = new RegExp(this.rules[i].validate);
                        if(!reg.test(value)) {
                            // this.$Message.error(this.rules[i].desc + '数据填写有误');
                            valid = false;
                            if(manifestNode.className.indexOf('form_builder_error') === -1) {
                                manifestNode.className =  manifestNode.className + ' form_builder_error';
                            }
                        }else {
                            if(manifestNode.className.indexOf('form_builder_error') > 0) {
                                manifestNode.className = manifestNode.className.replace('form_builder_error', '')
                            }
                        }
                    }else {
                        if(manifestNode.className.indexOf('form_builder_error') > 0) {
                            manifestNode.className = manifestNode.className.replace('form_builder_error', '')
                        }
                    }
                }
                if(valid) {
                    console.log(this.dataJson);
                }
            }
        }
    }
</script>

<style lang="less">
    .table-list {
        width: 1326px;
        margin: 0 auto;
        font-size: 14px;
        background-color: #ffffff;
    }
    .form_builder_error {
        border: 1px solid red!important;
    }
</style>