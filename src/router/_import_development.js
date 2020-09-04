//module.exports = file => require('@/views/' + file + '.vue')
//module.exports = file => () => import('@/views/' + file + '.vue')
module.exports = file => r => require.ensure([], () => r(require('@/views/' + file.split("@")[0] + '.vue')))

