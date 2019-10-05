const Koa = require('koa');
const Router = require('koa-router');
const midi = require('midi');

const app = new Koa();
var router = new Router();

const l = console.log;
const input = new midi.input();
if (input.getPortCount() > 0) input.openPort(0);
const keys = {};
const LABELS = ['C',  'C#',  'D',  'D#',  'E',  'F',  'F#',  'G',   'G#',   'A',  'A#',  'B'];
const _CONV  = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
const CONV = {};
_CONV.forEach((v, i) => CONV[LABELS[i]] = _CONV[i]);
const getNote = function (key) {
	return {
		key: key,
		note: LABELS[key%12],
		oct: Math.ceil((key+1)/12),
		vex: LABELS[key%12] + '/' + Math.ceil((key+1)/12)
	}
}

input.on('message', function(deltaTime, message) {
	if (message[0] !== 144 && message[0] !== 128) return;
	var key = message[1]-21-3;
	keys[key] = true;
	if (message[0] === 128) delete keys[key];
	l(Object.keys(keys).map(i => getNote(~~i)));
});

router.get('/api/yo', ctx => {
  ctx.body = 'hello!'
});


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT || 8080)