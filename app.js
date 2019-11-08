const express = require('express');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const app = express();

// Logs
logger.format('mydate', function() {
  const dateFormat = require('./node_modules/dateformat');
  return dateFormat(new Date(), 'HH:MM:ss.l');
});

app.use(logger('[:mydate] [LOG]   :method :url status::status - ' +
  'lenght::res[content-length] - :remote-addr - duration::response-time ms'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send('Não achou a rota! (404)');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error (500)');
});

module.exports = app;
