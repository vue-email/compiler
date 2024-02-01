import type { RuntimeCompilerOptions } from 'vue'
import type { I18n, VueEmailPluginOptions } from 'vue-email'

export interface RenderOptions {
  props?: Record<string, unknown>
  i18n?: I18n
  tailwind?: VueEmailPluginOptions['tailwind']
}

export interface DefineConfigFunctions {
  render: (name: string, options?: RenderOptions) => Promise<Result>
}

export type DefineConfig = (dir: string, config?: Options) => DefineConfigFunctions

export interface Options {
  /**
   * Show library logger
   * @default true
   */
  verbose?: boolean
  /**
   * VueEmailPlugin options
   * @default {}
   * @see
   * https://vuemail.net/getting-started/installation#options
   */
  options?: VueEmailPluginOptions
  vueCompilerOptions?: RuntimeCompilerOptions
}

export interface SourceOptions {
  /**
   * The source code of the component.
   */
  source: string
  /**
   * The components used in the component.
   */
  components: {
    name: string
    source: string
  }[]
}

export interface Result {
  html: string
  text: string
}
