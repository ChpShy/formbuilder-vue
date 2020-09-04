<template>
    <div class="tip_list_box">
        <ul class="list_box">
            <li class="list-item" v-for="(item, index) in listData" :key="index">
                <span class="title">{{item.split(':')[0]}}：</span>
                <span class="content">{{item.split(':')[1]}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "tipList",
        data() {
            return {
                listData: [
                    'component-type: 组件类型(可以根据该类型找到对应的组件节点，个性化处理)，' +
                    '目前有：province(省份下拉框)/city(城市下拉框)/area(区县下拉框)/textEditor(富文本编辑器)',
                    'btn-type: 按钮类型，operate(操作按钮，用于增加列删除列)/signBtn(签章按钮) ',
                    'name/manifest: 字段名，唯一',
                    'variable-type: 字段类型，通常和name一样，但是一个表单有多个相同的字段时，' +
                    '该值表示原始的字段名，name会添加数字',
                    'required: 是否必输, 值为true/false',
                    'desc: 字段描述，目前貌似没用到',
                    'need-delete: 值为true，删除标记，带该标记的节点在渲染表单时会删除，然后根据数据重新渲染',
                    'file-type: 限制上传文件类型，all: 不限制, pdf: pdf, img: 图片',
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .tip_list_box {
        padding-top: 2vh;
        padding-left: 3vw;
        height: 100%;
        font-size: 16px;
        background-color: #f4f4f4;
        color: #333;
        .list-item {
            margin-top: 10px;
            .title {
                display: inline-block;
                text-align: right;
                width: 150px;
                font-weight: 600;
                color: #000;
            }
        }
    }
</style>