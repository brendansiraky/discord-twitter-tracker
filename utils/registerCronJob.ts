import { CronJob } from 'cron'

import { crawlTweets } from '../crawlTweets'

export function registerCronJob() {
    new CronJob(
        // Every 5 minutes.
        '*/1 * * * *',
        async function () {
            console.log('calling crawl tweets')
            crawlTweets()
        },
        null,
        true,
    )
}