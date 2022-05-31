import Cron from 'cron'

import { config } from './config'
import { addRole } from './utils/addRole'
import { removeRole } from './utils/removeRole'
import { discordClient } from './utils/discordClient'
import { getRetweetedTweetIds } from './utils/getRetweetedTweetIds'
import { getTwitterIdFromHandle } from './utils/getTwitterIdFromHandle'
import { discordAssociatedTwitterAccounts } from './db/discordAssociatedTwitterAccounts'

export async function crawlTweets() {

    const twitterId = await getTwitterIdFromHandle('sunterra_io')

    console.log('got twitterIdss')
    
    const retweetedTweetsIds = await getRetweetedTweetIds(twitterId)
    console.log('got retweetedIds')
    
    const discordIdsThatShouldHaveRole = await discordAssociatedTwitterAccounts()
    .whereIn('twitter_id', retweetedTweetsIds)
    .pluck('discord_id')
    
    console.log('got discordIdsTHatShouldHaveRole')
    // Fetch the guild and cache.
    const guild = await discordClient.guilds.fetch(config.CHANNEL_ID)
    
    console.log('got Guild')

    let lastMemberId;
    while (true) {
        // Cache all of the members in this guild
        try {
            const limit = 100
            const members = await guild.members.list({
                cache: true,
                limit,
                after: lastMemberId
            })
    
            lastMemberId = members.last()?.id
            console.log('doing loop:', lastMemberId)
            if (members.size < limit) {
                console.log('breaking loop')
                break;
            }
            

        } catch (error) {
            console.log('error caught inside while loop:', error)
            break;
        }

    }

    // Get the role from the guild.
    const role = await guild.roles.fetch(config.ROLE_ID)

    console.log('got Role')
    
    // Get all members that belong to this role.
    const membersWithRole = role.members.map(m => m.user.id)
    console.log('got members with role')
    
    // Loop through the current members that have a role, and check to see whether they should keep it or not.
    for (const memberWithRole of membersWithRole) {
        if (!discordIdsThatShouldHaveRole.includes(memberWithRole)) {
            // If the current user has a role, but is not contained in the members who SHOULd have a role.
            removeRole(memberWithRole)
        }
    }

    // Looop through the members who are eligable for a role, and give it to them
    for (const discordIdThatShouldHaveRole of discordIdsThatShouldHaveRole) {
        addRole(discordIdThatShouldHaveRole)
    }

}