import { CronJob } from 'cron'

import { crawlTweets } from '../crawlTweets'

export function registerCronJob() {
    new CronJob(
        // Every 5 minutes.
        '*/5 * * * *',
        async function () {
            console.log('calling crawl tweets')
            crawlTweets()
        },
        null,
        true,
    )
}