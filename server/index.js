/**
 * [express description]
 * @file
 * @author Yangholmes 2018-05-25
 */

const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const koaViews = require('koa-views');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

// router
router.get('/', (ctx, next) => {
    ctx.body = '欢迎使用';
});

// sign up
router.post('/signup', koaBody, (ctx, next) => {

});

// sign in
router.post('/signin', koaBody, (ctx, next) => {

});

// sign out
router.post('/signout', koaBody, (ctx, next) => {

});

app.use(router.routes()).use(router.allowedMethods());

http.createServer(app.callback()).listen(80);
