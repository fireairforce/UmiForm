const getRelPath = path => __dirname + path
export default {
  // hash:true,
  treeShaking: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      title: '2019ACM俱乐部报名表单',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: '/components/loading.js',
        level:1
      }
    }],
  ],
  alias:{
    utils: getRelPath('/src/utils'),
    components: getRelPath('/src/components'),
  }
}
