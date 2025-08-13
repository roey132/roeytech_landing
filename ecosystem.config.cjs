module.exports = {
  apps: [{
    name: 'roeytech', // PM2 app name
    script: 'dist/server/entry.mjs',
    interpreter: 'node',
    env: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0', // so it listens on all network interfaces
      PORT: '8080'     // or whichever port you want
    }
  }]
};
