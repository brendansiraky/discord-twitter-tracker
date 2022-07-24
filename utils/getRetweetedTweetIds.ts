import { DateTime } from 'luxon'

import { twitterClient } from './twitterClient'
import { config } from '../config'

// Grab a list of tweetIds that have retweeted a specific userId in the past X amount of time
export async function getRetweetedTweetIds(userId: string) {

    const getUniqueUserIds = (users: { id: string, name: string, username: string }[]) => users.reduce((acc, cur) => {
        if (!acc.includes(cur.id)) {
            acc.push(cur.id)
        }
        return acc
    }, [])

    const tweets = await twitterClient.v2.userTimeline(userId, {
        "tweet.fields": ['created_at'],
        start_time: DateTime.utc().minus({ days: Number(config.RETWEET_TIMEFRAME_IN_DAYS) }).toISO()
    })

    let tweetIds = []
    for await (const tweet of tweets) {
        tweetIds.push(tweet.id)
    }

    const usersThatHaveRetweeted = []

    for (const tweetId of tweetIds) {
        const retweetedBy = await twitterClient.v2.tweetRetweetedBy(tweetId, { asPaginator: true })

        for await (const user of retweetedBy) {
            usersThatHaveRetweeted.push(user)
        }
    }

    return getUniqueUserIds(usersThatHaveRetweeted)
}