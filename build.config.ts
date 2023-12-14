import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  externals: ['vue'],
  // alias: {
  //   'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
  // },
})
