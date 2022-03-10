# AL-1S

## 실행 방법

- 배포하기: 빌드하고 나서 `scp dist/index.js username@host:destination_path`
- 서버에서 실행 시: `pm2 start index.js --name "AL-1S" -i max`

## 환경변수 파일

### `development.credential.env` 및 `production.credential.env`

```md
MONGO_DB_URI=
MONGO_DB_USER=
MONGO_DB_PASSWORD=
TELEGRAM_BOT_TOKEN=
WEBHOOK_KEY=
```
