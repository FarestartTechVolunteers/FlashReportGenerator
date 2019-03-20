const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const fs = require('fs')

const app = new Koa()
const router = new Router()

router.get('/api/getData', (ctx) => {
  const data = fs.readFileSync('./ctuit-res.json', 'utf8')
  ctx.response.type = 'json'
  ctx.body = data
})

app.use(logger())
app.use(router.routes())
app.listen(3001)
