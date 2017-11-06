const BS = require('browser-sync');

const config = {
  server: true,
  files: ['src/**/*', 'styles/**/*'],
  open: false,
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
  }
}

BS(config);
