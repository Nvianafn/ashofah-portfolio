// PM2 process file. Usage: pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "ashofah-portfolio",
      // runs "next start" on port 3000
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/ashofah-portfolio",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
