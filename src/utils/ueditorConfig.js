export default {
    allowDivTransToP: false,
    autoHeight: false,
    autoHeightEnabled: false,
    initialFrameWidth: '100%',
    // initialFrameWidth: 1000,
    initialFrameHeight: 500,
    zIndex: 1,
    contextMenu: [
        {label: '', cmdName: 'selectall'},
        {
            label: '',
            cmdName: 'cleardoc',
            exec: function () {
                this.execCommand('cleardoc');
            }
        },
        {
            label: '去除选中表格边框',
            cmdName: 'cleardoc',
            icon: 'aligntd',
            exec: function () {
                var selectTds = this.document.getElementsByClassName('selectTdClass');
                if (selectTds && selectTds.length > 0) {
                    for (var i = 0; i < selectTds.length; i++) {
                        selectTds[i].style.border = 'none';
                    }
                }
            }
        },
        '-',
        {
            cmdName: 'unlink'
        },
        '-',
        {
            group: '',
            icon: 'justifyjustify',
            subMenu: [
                {
                    label: '',
                    cmdName: 'justify',
                    value: 'left'
                },
                {
                    label: '',
                    cmdName: 'justify',
                    value: 'right'
                },
                {
                    label: '',
                    cmdName: 'justify',
                    value: 'center'
                },
                {
                    label: '',
                    cmdName: 'justify',
                    value: 'justify'
                }
            ]
        },
        '-',
        {
            group: '',
            icon: 'table',
            subMenu: [
                {
                    label: '',
                    cmdName: 'inserttable'
                },
                {
                    label: '',
                    cmdName: 'deletetable'
                },
                '-',
                {
                    label: '',
                    cmdName: 'deleterow'
                },
                {
                    label: '',
                    cmdName: 'deletecol'
                },
                {
                    label: '',
                    cmdName: 'insertcol'
                },
                {
                    label: '',
                    cmdName: 'insertcolnext'
                },
                {
                    label: '',
                    cmdName: 'insertrow'
                },
                {
                    label: '',
                    cmdName: 'insertrownext'
                },
                '-',
                {
                    label: '',
                    cmdName: 'insertcaption'
                },
                {
                    label: '',
                    cmdName: 'deletecaption'
                },
                {
                    label: '',
                    cmdName: 'inserttitle'
                },
                {
                    label: '',
                    cmdName: 'deletetitle'
                },
                {
                    label: '',
                    cmdName: 'inserttitlecol'
                },
                {
                    label: '',
                    cmdName: 'deletetitlecol'
                },
                '-',
                {
                    cmdName: 'mergecells'
                },
                {
                    cmdName: 'mergeright'
                },
                {
                    cmdName: 'mergedown'
                },
                '-',
                {
                    cmdName: 'splittorows'
                },
                {
                    cmdName: 'splittocols'
                },
                {
                    cmdName: 'splittocells'
                },
                '-',
                {
                    cmdName: 'averagedistributerow'
                },
                {
                    cmdName: 'averagedistributecol'
                },
                '-',
                {
                    cmdName: 'edittd',
                    exec: function () {
                        if (UE.ui['edittd']) {
                            new UE.ui['edittd'](this);
                        }
                        this.getDialog('edittd').open();
                    }
                },
                {
                    cmdName: 'edittable',
                    exec: function () {
                        if (UE.ui['edittable']) {
                            new UE.ui['edittable'](this);
                        }
                        this.getDialog('edittable').open();
                    }
                },
                {
                    cmdName: 'setbordervisible'
                }
            ]
        },
        {
            group: '',
            icon: 'tablesort',
            subMenu: [
                {
                    cmdName: 'enablesort'
                },
                {
                    cmdName: 'disablesort'
                },
                '-',
                {
                    cmdName: 'sorttable',
                    value: 'reversecurrent'
                },
                {
                    cmdName: 'sorttable',
                    value: 'orderbyasc'
                },
                {
                    cmdName: 'sorttable',
                    value: 'reversebyasc'
                },
                {
                    cmdName: 'sorttable',
                    value: 'orderbynum'
                },
                {
                    cmdName: 'sorttable',
                    value: 'reversebynum'
                }
            ]
        },
        {
            group: '',
            icon: 'borderBack',
            subMenu: [
                {
                    cmdName: "interlacetable",
                    exec: function () {
                        this.execCommand("interlacetable");
                    }
                },
                {
                    cmdName: "uninterlacetable",
                    exec: function () {
                        this.execCommand("uninterlacetable");
                    }
                },
                {
                    cmdName: "settablebackground",
                    exec: function () {
                        this.execCommand("settablebackground", {repeat: true, colorList: ["#bbb", "#ccc"]});
                    }
                },
                {
                    cmdName: "cleartablebackground",
                    exec: function () {
                        this.execCommand("cleartablebackground");
                    }
                },
                {
                    cmdName: "settablebackground",
                    exec: function () {
                        this.execCommand("settablebackground", {repeat: true, colorList: ["red", "blue"]});
                    }
                },
                {
                    cmdName: "settablebackground",
                    exec: function () {
                        this.execCommand("settablebackground", {repeat: true, colorList: ["#aaa", "#bbb", "#ccc"]});
                    }
                }
            ]
        },
        {
            group: '',
            icon: 'aligntd',
            subMenu: [
                {
                    cmdName: 'cellalignment',
                    value: {align: 'left', vAlign: 'top'}
                },
                {
                    cmdName: 'cellalignment',
                    value: {align: 'center', vAlign: 'top'}
                },
                {
                    cmdName: 'cellalignment',
                    value: {align: 'right', vAlign: 'top'}
                },
                {
                    cmdName: 'cellalignment',
                    value: {align: 'left', vAlign: 'middle'}
                },
                {
                    cmdName: 'cellalignment',
                    value: {align: 'center', vAlign: 'middle'}
                },
                {
                    cmdName: 'cellalignment',
                    value: {align: 'right', vAlign: 'middle'}
                },
                {
                    cmdName: 'cellalignment',
                    value: {align: 'left', vAlign: 'bottom'}
                },
                {
                    cmdName: 'cellalignment',
                    value: {align: 'center', vAlign: 'bottom'}
                },
                {
                    cmdName: 'cellalignment',
                    value: {align: 'right', vAlign: 'bottom'}
                }
            ]
        },
        {
            group: '',
            icon: 'aligntable',
            subMenu: [
                {
                    cmdName: 'tablealignment',
                    className: 'left',
                    label: '',
                    value: "left"
                },
                {
                    cmdName: 'tablealignment',
                    className: 'center',
                    label: '',
                    value: "center"
                },
                {
                    cmdName: 'tablealignment',
                    className: 'right',
                    label: '',
                    value: "right"
                }
            ]
        },
        '-',
        {
            label: '前插入段落',
            cmdName: 'insertparagraph',
            value: true
        },
        {
            label: '后插入段落',
            cmdName: 'insertparagraph'
        },
        {
            cmdName: 'copy'
        },
        {
            cmdName: 'paste'
        }
    ]
}