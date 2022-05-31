import { TwitterApi } from 'twitter-api-v2'

import { config } from '../config'

const client = new TwitterApi(config.BEARER_TOKEN)
export const twitterClient = client.readOnly;