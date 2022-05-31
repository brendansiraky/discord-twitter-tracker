import { config } from '../config'
import { discordClient } from './discordClient'

export function getGuild() {
    return discordClient.guilds.cache.get(config.CHANNEL_ID)
}