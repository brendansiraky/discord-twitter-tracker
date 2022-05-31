import { Message } from 'discord.js'

import { config } from './config'
import { twitterBot } from './bot/TwitterBot'
import { discordClient } from './utils/discordClient'
import { registerCronJob } from './utils/registerCronJob'

discordClient.login(config.TWITTER_BOT_TOKEN)

discordClient.on('ready', async () => {
    console.log('Twtter Bot Connected!')
    registerCronJob()    
})

discordClient.on('messageCreate', async (message: Message) => {
    twitterBot(message)
})


