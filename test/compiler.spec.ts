import { resolve } from 'node:path'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import { config } from '../src/index'

describe('compiler', () => {
  const path = resolve(__dirname, './templates')
  const vuemail = config(path, {
    vueCompilerOptions: {
      isCustomElement: tag => tag === 'mjml' || tag.startsWith('mj-'),
    },
  })

  it('it should compile vue files', async () => {
    const template = await vuemail.render('DefineComponent.vue', {
      props: {
        name: 'Dave',
      },
    })

    expect(template.html).toBe('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><h1>Hi! My name is Dave</h1>')
  })

  it('should render defineComponent setup', async () => {
    const template = await vuemail.render('DefineComponentSetup.vue', {
      props: {
        count: 2,
      },
    })

    expect(template.html).toBe(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><section><p>Count: 2</p><p>Double: 4</p></section>',
    )
  })

  it('should compile and render component defined using script setup', async () => {
    const template = await vuemail.render('ScriptSetup.vue', {
      props: {
        name: 'John Doe',
      },
    })

    expect(template.html).toBe(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><section><h1>Welcome John Doe</h1></section>',
    )
  })

  it('should translate template content', async () => {
    const vuemail = config(path, {
      options: {
        i18n: {
          defaultLocale: 'en',
          translations: {
            en: {
              message: 'Hello world!',
            },
            es: {
              message: 'Hola mundo!',
            },
          },
        },
      },
    })

    const templateEn = await vuemail.render('Translate.vue', { i18n: { defaultLocale: 'en' } })
    const templateEs = await vuemail.render('Translate.vue', { i18n: { defaultLocale: 'es' } })

    expect(templateEn.html.includes('Hello world!')).toBe(true)
    expect(templateEs.html.includes('Hola mundo!')).toBe(true)
  })

  it('should render with empty setup content', async () => {
    const template = await vuemail.render('TsScriptSetup.vue')

    expect(template.html).toBe(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><section><p>Hello</p></section>',
    )
  })

  it('auto imported components', async () => {
    const template = await vuemail.render('UseOtherComponents.vue')

    expect(template.html).toBe(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><section><h1 data-id="__vue-email-heading" style="" class="mx-0 my-[30px] p-0 text-center text-[24px] font-bold text-black"> Content inside Hello </h1><h1 data-id="__vue-email-heading" style="" class="mx-0 my-[30px] p-0 text-center text-[24px] font-bold text-black"> Content inside hello </h1></section>',
    )
  })

  it('components with props', async () => {
    const template = await vuemail.render('Main.vue')

    expect(template.html).toBe(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><body><h1>testing</h1><div>test</div></body>',
    )
  })

  it('should add custom component', async () => {
    const template = await vuemail.render('ComponentInComponent.vue', {
      components: {
        Custom: defineComponent({
          props: {
            name: String,
          },
          setup(props) {
            return () => h('p', {}, `Hello, ${props.name}!`)
          },
        }),
      },
    })

    expect(template.html).toBe(
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><p>Hello, Valerii!</p>',
    )
  })
})
