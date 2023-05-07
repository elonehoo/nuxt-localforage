import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    'localforage'
  ],
  clean: true,
  declaration: true,
  failOnWarn: false
})
