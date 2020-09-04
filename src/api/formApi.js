import  Fetch from '../utils/request';

//表单详情
export function formDetail(data) {
    return Fetch({
        url: "/form/detail",
        data: data
    });
}

//表单分页列表
export function formListPage(data) {
    return Fetch({
        url: "/form/listPage",
        data: data,
    });
}

//表单保存
export function formSave(data) {
    return Fetch({
        url: "/form/add",
        data: data
    });
}

//表单编辑
export function formUpdate(data) {
    return Fetch({
        url: "/form/update",
        data: data
    });
}

//表单删除
export function formDelete(data) {
    return Fetch({
        url: "/form/delete",
        data: data
    });
}

//获取所有变量类别列表
export function nameList(data) {
    return Fetch({
        url: "/name/list",
        data: data
    });
}

//获取所有变量类别分页列表
export function nameListPage(data) {
    return Fetch({
        url: "/name/listPage",
        data: data
    });
}

//新增变量
export function nameAdd(data) {
    return Fetch({
        url: "/name/add",
        data: data
    });
}

//编辑变量
export function nameUpdate(data) {
    return Fetch({
        url: "/name/update",
        data: data
    });
}

//删除变量
export function nameDelete(data) {
    return Fetch({
        url: "/name/delete",
        data: data
    });
}
