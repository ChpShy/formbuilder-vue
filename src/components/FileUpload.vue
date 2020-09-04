<template>
    <div>
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
                ref="upload"
                :action="fileUploadParams.url"
                :data="fileUploadParams.data"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
            <img :src="uploadList[0].url" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import {getUploadFileParams} from '../utils/utils';

    export default {
        name: "FileUpload",
        model: {
            event: 'change'
        },
        data() {
            return {
                fileUploadParams: {
                    url: process.env.OSS_API,
                    data: {}
                },
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            reviewImg(url) {
                this.$refs.upload.fileList = this.uploadList = [
                    {
                        status: 'finished',
                        name: '',
                        url: url
                    }
                ];
                this.$emit('change', url);
            },
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.$emit('change', '');
            },
            handleSuccess(res, file) {
                file.url = process.env.OSS_API + this.fileUploadParams.data.key;
                var keys = this.fileUploadParams.data.key.split('/');
                file.name = keys[keys.length - 1];
                this.$emit('change', file.url);
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload(file) {
                const check = this.uploadList.length >= 1;
                if (check) {
                    this.$Notice.warning({
                        title: '只能上传一张图片'
                    });
                } else {
                    this.fileUploadParams.data = getUploadFileParams(file);
                    this.$nextTick(function () {
                        this.$refs.upload.post(file);
                    });
                }
                return false;
            }
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>

<style scoped>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>