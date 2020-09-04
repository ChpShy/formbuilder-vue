<template>
    <div class="table-wrap">
        <div class="search-wrap">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="88" inline>
                <FormItem label="关键词：" prop="keyword" style="width: 468px">
                    <Input icon="ios-search" clearable v-model="formValidate.keyword"
                           @on-keydown.prevent.enter="handleSubmit('formValidate')"
                           placeholder="请输入表单标题查询"></Input>
                </FormItem>
                <FormItem :label-width="25">
                    <Button type="primary" class="p-s-button-80" @click="handleSubmit('formValidate')">搜索
                    </Button>
                </FormItem>
                <br>
                <FormItem :label-width="25">
                    <router-link to="/form/add">
                        <Button class="p-s-button-80">新增</Button>
                    </router-link>
                </FormItem>
            </Form>
        </div>
        <Table border :columns="tableColumns" :data="tableData"></Table>
        <Page :total="pageData.total" :current.sync="pageData.current" :page-size="pageData.pageSize"
              show-total show-elevator @on-change="search" style="text-align: right;margin-top: 10px"></Page>
        <Modal title="删除" v-model="delModal" @on-ok="remove(delId)">
            <p>确定删除吗</p>
        </Modal>
    </div>
</template>

<script>
    import {formListPage, formDelete} from '@/api/formApi';

    export default {
        name: "tableList",
        data() {
            return {
                delModal: false,
                delId: '',
                formValidate: {
                    keyword: ''
                },
                ruleValidate: {},
                tableColumns: [
                    {
                        title: '序号',
                        type: 'index',
                    },
                    {
                        title: '表单名称',
                        key: 'title'
                    },
                    {
                        title: '缩略图',
                        width: 130,
                        render: (h, params) => {
                            return h('a', {
                                attrs: {
                                    href: params.row.img,
                                    target: '_blank'
                                }
                            }, [
                                h('img',
                                    {
                                        attrs: {
                                            src: params.row.img
                                        },
                                        style: {
                                            width: '100px',
                                            height: '150px'
                                        },
                                    }
                                )
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            window.open('/#/form/edit?id=' + params.row._id);
                                          /*  this.$router.push({
                                                path: '/form/edit',
                                                query: {id: params.row._id}
                                            })*/
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            window.open('#/review?id=' + params.row._id);
                                        }
                                    }
                                }, '预览'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                path: '/form/add',
                                                query: {id: params.row._id}
                                            })
                                        }
                                    }
                                }, '引用'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delId = params.row._id;
                                            this.delModal = true;
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                tableData: [],
                pageData: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                }
            }
        },
        mounted() {
            this.handleSubmit();
        },
        methods: {
            handleSubmit() {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.pageData.current = 1;
                        this.search();
                    }
                });
            },
            search() {
                var _this = this;
                formListPage({
                    keyword: this.formValidate.keyword,
                    pageSize: this.pageData.pageSize,
                    current: this.pageData.current
                }).then(res => {
                    _this.tableData = res.data;
                    _this.pageData.total = res.total;
                });
            },
            show(index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove(index) {
                formDelete({_id: index}).then(res => {
                    this.$Message.success('删除成功');
                    this.handleSubmit();
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .table-wrap {
        width: 70vw;
        margin: 0 auto;
        padding-top: 10vh;
        padding-bottom: 10vh;
    }
</style>