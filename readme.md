# discord-twitter-tracker

A discord bot that tracks a users retweets for a specific twitter account.

## Requirements

Node v16.6.0 or higher
## Installation

```bash
cp .env.example .env
```

```bash
npm install -g typescript ts-node knex
```

```bash
npm install
```

```bash
knex migrate:latest
```

## Instructions

- Create a Bot through the discord developer portal, give it relevant permissions and invite it to your discord server.

#### Add to the .env File:

- The TOKEN from the discord developer portal, for a specific bot.

- The BEARER_TOKEN from the twitter developer portal.

- The ROLE_ID which relates to a discord role that the user will receive if they have reteeted within the timeframe.

- The RETWEET_TIMEFRAME_IN_DAYS which relates to how recently must the user have retweeted something in order to receive the role.

- All the necessary PG_... credentials.

## Running

```bash
npm run start
```

## Notes

- It's assumed that a database already exist to interact with.

## License
[MIT](https://choosealicense.com/licenses/mit/)