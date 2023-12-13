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
  dependencies: ['esbuild'],
  externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', 'vue-email', 'vue-i18n'],
})
