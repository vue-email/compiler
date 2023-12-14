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
    replace: {
      __VUE_PROD_DEVTOOLS__: false,
    },
  },
  externals: ['vue'],
})
