import dotenv from 'dotenv'

dotenv.config()

export const config = {
    BEARER_TOKEN: process.env.BEARER_TOKEN,
    TOKEN: process.env.TOKEN,

    TWITTER_ACCOUNT_HANDLE: process.env.TWITTER_ACCOUNT_HANDLE,

    ROLE_ID: process.env.ROLE_ID,
    CHANNEL_ID: process.env.CHANNEL_ID,

    PG_DATABASE_NAME: process.env.PG_DATABASE_NAME,
    PG_USER: process.env.PG_USER,
    PG_DATABASE_PASSWORD: process.env.PG_DATABASE_PASSWORD,

    RETWEET_TIMEFRAME_IN_DAYS: process.env.RETWEET_TIMEFRAME_IN_DAYS
}