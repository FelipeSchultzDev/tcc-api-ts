import app from './config/app'
import variables from './config/variables'
import ColorCMD from './util/ColorCMD'
import autoCreatePermission from './util/autoCreatePermissions'
import autoCreateTypes from './util/autoCreateTypes'

const server = app.listen(variables.Api, async (): Promise<void> => {
  ColorCMD('purple', '', '[API] Rodando')
  ColorCMD('purple', '', `[API] Porta: ${variables.Api.port}`)
  await autoCreatePermission()
  await autoCreateTypes()
})
server.timeout = 30000
