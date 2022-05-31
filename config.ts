import dotenv from 'dotenv'

dotenv.config()

export const config = {
    BEARER_TOKEN: process.env.BEARER_TOKEN,
    TWITTER_BOT_TOKEN: process.env.TWITTER_BOT_TOKEN,
    ROLE_ID: process.env.ROLE_ID,
    CHANNEL_ID: process.env.CHANNEL_ID
}