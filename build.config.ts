import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    'localforage'
  ],
  failOnWarn: false
})
