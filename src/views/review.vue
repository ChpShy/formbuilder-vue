<template>
    <div class="table-list">
        <Button type="primary" @click="$router.push('/')" style="margin-top: 50px">新建表格</Button>
        <Button type="primary" @click="generateImg" style="margin-top: 50px">生成缩略图</Button>
        <div class="table-content">
            <div style="margin-bottom: 20px">
                缩略图：
                <div ref="viewImg"></div>
            </div>
            <br>
            表名: {{tableData.title}} <br>
            <div class="table-wrap" ref="tableView" v-html="tableData.html"></div>
        </div>
    </div>
</template>

<script>
    import {formDetail} from "../api/formApi";
    import {checkTableHtml} from "@/utils/utils";
    import html2canvas from 'html2canvas';
    import '@/utils/fsCommonUtils.js';
    // import 'http://isp-prod.oss-cn-hangzhou.aliyuncs.com/components/utils/fsCommonUtils.js';

    export default {
        name: "review",
        data() {
            return {
                tableData: {},
                dataJson: {},
                rules: {}
            }
        },
        mounted() {
            if (this.$route.query.id) {
                this.search();
            } else {
                this.tableData = JSON.parse(window.localStorage.getItem('tableData'));
                this.$nextTick(function () {
                    // this.checkName();
                    var tableDom = this.$refs.tableView;
                    checkTableHtml(tableDom);
                })
            }
        },
        methods: {
            search() {
                formDetail({_id: this.$route.query.id}).then(res => {
                    this.tableData = res;
                    this.$nextTick(function () {
                        // this.checkName();
                        var tableDom = this.$refs.tableView;
                        checkTableHtml(tableDom);
                    })
                });
            },
            generateImg() {
                html2canvas(this.$refs.tableView).then(canvas => {
                    this.$refs.viewImg.appendChild(canvas);
                })
            },
            checkName() {
                var allManifestNode = this.$refs.tableView.querySelectorAll('[name]');
                if (allManifestNode) {
                    allManifestNode.forEach(v => {
                        var manifest = v.getAttribute('name'),
                            desc = v.getAttribute('desc'),
                            manifestNodes = this.$refs.tableView.querySelectorAll('[manifest="' + manifest + '"]'),
                            manifestLen = manifestNodes.length;
                        //校验变量名是否重复
                        if (manifestLen > 1) {
                            this.$Message.error('变量名：' + desc + '重复，建议删了重新拖');
                            return;
                        }
                        if(v.type === 'checkbox' || v.type === 'radio') {
                            var divNodeLen = document.querySelectorAll('div[manifest="' + manifest + '"]');
                            if(divNodeLen.length === 0) {
                                this.$Message.error('变量名：' + manifest + '的生成有问题，建议删了选项框重新拖');
                            }else {
                                var inputNodes = divNodeLen[0].querySelectorAll('input[type="checkbox"]'), values = [];
                                inputNodes.forEach(checkDom => {
                                    var value = checkDom.value;
                                    if (values.indexOf(value) > -1) {
                                        this.$Message.error('变量名：' + desc + '的选项框的枚举值：' +
                                            value + '重复，建议删了选项框重新拖');
                                        return;
                                    } else {
                                        values.push(value);
                                    }
                                });
                            }
                        }
                    });
                }
            },
            isCheckbox(manifestNode) {
                return manifestNode.type === 'checkbox';
            },
            isRadio(manifestNode) {
                return manifestNode.type === 'radio';
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
        .table-content {
            text-align: center;
            .table-wrap {
                padding: 20px 50px;
            }
        }
    }
</style>