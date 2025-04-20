# PandaMarket API

## 실행하기

### 도커를 통하여 실행하기

도커를 사용하면, 환경에 구애받지 않고 어플리케이션을 쉽게 개발 및 실행할 수 있습니다.

해당 장에서는 도커에 대해 자세하게 설명하지 않습니다.
자세한 사항은 [도커 공식문서](https://docs.docker.com/desktop/)를 참조해주세요.

#### 준비물

-   npm
-   docker
-   cocker-compose

#### 실행하는 방법

```shell
npm run compose
```

docker-compose 를 통해 실행했다면, postgresql 은 도커 내부에 자동적으로 만들어집니다.

아래는 자원의 접근 정보입니다.

**DB**

-   `PORT` : 15432 (localhost:15432 으로 접근)
-   `USER_NAME` : postgres
-   `USER_PASSWORD` : postgres

**Service**

-   `PORT` : 3000 (localhost:3000 으로 접근)

### 로컬 환경에서 실행하기

#### 준비물

-   nodejs
-   postgresql

#### 실행 전, 필요한 작업

1. `.env` 파일의 `DATABASE_URL`

PostgreSQL 접속정보를 환경변수에 반영해야 합니다.
아래 포맷에 맞추어 `DATABASE_URL` 값을 수정해주세요.

```
DATABASE_URL=postgresql://{userName}:{password}@{dbHost}:{dbPort}/{dbName}
```

2. DB 마이그레이션

서비스를 운영하기 위해 필요한 테이블들을 생성해야 합니다.

-   Article
-   Product
-   Comment

```
npx prisma migrate deploy
```

PostgreSQL 접속정보가 올바르지 않다면 실패할 수 있습니다.

3. DB Seeding (옵션)

```
npm run seed
```

4. 의존성 설치

서비스가 동작하기 위해 필요한 라이브러리를 설치합니다.

```
npm install
```

5. Prisma Client 생성

`@prisma/client` 는 로컬의 `schema.prisma` 파일을 읽어서 만들어지는 패키지입니다.
처음 및 스키마 파일이 변경될 때 마다, 아래 명령어를 실행해주세요.

```
npx prisma generate
```

6. 서비스 실행

```
npm start
```

7. swagger docs 확인
   http://localhost:3000/api-docs로 접속
