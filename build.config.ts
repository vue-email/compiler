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
    esbuild: {
      target: 'esnext',
    },
  },
  externals: ['vue', 'vue/compiler-sfc', 'vue/server-renderer', 'vue-email', 'vue-i18n'],
})
