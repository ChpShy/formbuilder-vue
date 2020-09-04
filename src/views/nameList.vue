<template>
    <div class="table-wrap">
        <div class="search-wrap">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="88" inline>
                <FormItem label="关键词：" prop="keyword" style="width: 468px">
                    <Input icon="ios-search" clearable v-model="formValidate.keyword"
                           @on-keydown.prevent.enter="handleSubmit('formValidate')"
                           placeholder="请输入变量英文名或者中文名查询"></Input>
                </FormItem>
                <FormItem :label-width="25">
                    <Button type="primary" class="p-s-button-80" @click="handleSubmit('formValidate')">搜索
                    </Button>
                </FormItem>
                <br>
                <FormItem :label-width="25">
                    <Button class="p-s-button-80" @click="toAdd">新增</Button>
                </FormItem>
            </Form>
        </div>
        <Table border :columns="tableColumns" :data="tableData"></Table>
        <Page :total="pageData.total" :current.sync="pageData.current" :page-size="pageData.pageSize"
              show-total show-elevator @on-change="search" style="text-align: right;margin-top: 10px"></Page>
        <Modal
                v-model="addNameOptions.modal"
                :title="addNameOptions.operateFlag == 'add'? '添加变量' : '编辑变量'"
                :loading="addNameOptions.loading"
                @on-visible-change="modalVisibleChange"
                @on-ok="addNameEvt">
            <Form ref="addNameFormValidate" :model="addNameOptions.formValidate" :rules="addNameOptions.rules"
                  :label-width="120" inline>
                <FormItem label="变量英文名：" prop="key">
                    <Input v-model="addNameOptions.formValidate.key" style="width: 200px;"></Input>
                </FormItem>
                <FormItem label="变量中文名：" prop="value">
                    <Input v-model="addNameOptions.formValidate.value" style="width: 200px;"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal title="删除" v-model="delModal" @on-ok="remove(delId)">
            <p>确定删除吗</p>
        </Modal>
    </div>
</template>

<script>
    import {nameListPage, nameAdd, nameUpdate, nameDelete} from '@/api/formApi';

    export default {
        name: "nameList",
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
                        width: 80
                    },
                    {
                        title: '变量英文名',
                        key: 'key'
                    },
                    {
                        title: '变量中文名',
                        key: 'value'
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
                                            this.toUpdate(params.row);
                                        }
                                    }
                                }, '编辑'),
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
                },
                addNameOptions: {               //新增变量的属性
                    modal: false,
                    loading: true,
                    operateFlag: 'add',
                    formValidate: {
                        key: '',
                        value: ''
                    },
                    rules: {
                        key: [
                            {required: true, message: '请输入变量英文名', trigger: 'blur'}
                        ],
                        value: [
                            {required: true, message: '请输入变量中文名', trigger: 'blur'}
                        ]
                    }
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
                nameListPage({
                    keyword: this.formValidate.keyword,
                    pageSize: this.pageData.pageSize,
                    current: this.pageData.current
                }).then(res => {
                    _this.tableData = res.data;
                    _this.pageData.total = res.total;
                });
            },
            modalVisibleChange(flag) {
                if(!flag) {
                    this.$refs.addNameFormValidate.resetFields();
                }
            },
            toAdd() {
                this.addNameOptions.modal = true;
                this.addNameOptions.operateFlag = 'add';
            },
            addNameEvt() {
                this.$refs.addNameFormValidate.validate(valid => {
                    if (valid) {
                        if(this.addNameOptions.operateFlag === 'add') {
                            nameAdd(this.addNameOptions.formValidate).then(res => {
                                this.handleSubmit();
                                this.addNameOptions.modal = false;
                            }).catch(() => {
                                this.addNameOptions.loading = false;
                                this.$nextTick(function () {
                                    this.addNameOptions.loading = true;
                                })
                            });
                        }else {
                            nameUpdate(this.addNameOptions.formValidate).then(res => {
                                this.handleSubmit();
                                this.addNameOptions.modal = false;
                            }).catch(() => {
                                this.addNameOptions.loading = false;
                                this.$nextTick(function () {
                                    this.addNameOptions.loading = true;
                                })
                            });
                        }

                    } else {
                        this.addNameOptions.loading = false;
                        this.$nextTick(function () {
                            this.addNameOptions.loading = true;
                        })
                    }
                })
            },
            toUpdate(params) {
                this.addNameOptions.modal = true;
                this.addNameOptions.operateFlag = 'edit';
                this.addNameOptions.formValidate._id = params._id;
                this.addNameOptions.formValidate.key = params.key;
                this.addNameOptions.formValidate.value = params.value;
            },
            remove(index) {
                nameDelete({_id: index}).then(res => {
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