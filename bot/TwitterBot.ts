import { Message } from 'discord.js'

import { getTwitterIdFromHandle } from '../utils/getTwitterIdFromHandle'
import { discordAssociatedTwitterAccounts } from '../db/discordAssociatedTwitterAccounts'

export const twitterBot = async (message: Message) => {
    /*
        Disregard if any messages come through as a bot.
        This also helps deal with replying and being caught in a messaging loop.
    */
    if (message.author.bot) {
        return
    }

    if (message.channel.type === 'DM') {

        try {
            const twitterUserId = await getTwitterIdFromHandle(message.content.replace('@', ''))
            const discordUserId = message.author.id

            if (!twitterUserId) {
                throw ''
            }
        
            const [twitterEntryRow] = await discordAssociatedTwitterAccounts()
                .select('*')
                .where({ discord_id: discordUserId })
            
            if (!twitterEntryRow) {
                // Insert a new row because they do not currently exist in our database
                await discordAssociatedTwitterAccounts()
                    .insert({ discord_id: discordUserId, twitter_id: twitterUserId })

                message.reply('Successfully registered your twitter handle.')
                
            } else {
                // Update their handle as they already exist
                const [twitterEntryRow] = await discordAssociatedTwitterAccounts()
                    .where({ discord_id: discordUserId })
                    .update({ twitter_id: twitterUserId })
                    .returning('*')
                
                if (!twitterEntryRow) {
                    throw ''
                }

                message.reply('Successfully updated your twitter handle.')
            }
        } catch (error) {
            // If for any reason we catch an error, reply with a generic message.
            message.reply(`Sorry but your handle was not able to be processed. Make sure you are entering just the address on it's own, as well as making sure the spelling is correct.`)
        }

    }
    
}