# AL-1S

- 배포하기: 빌드하고 나서 `scp dist/index.js ubuntu@192.168.0.25:/home/ubuntu/deploy`
- 서버에서 실행 시: `pm2 start index.js --name "AL-1S" -i max`
