import { config } from '../config'
import { getGuild } from './getGuild'

export async function removeRole(userId: string) {
    try {
        const guild = getGuild()
        const member = guild.members.cache.get(userId)
        if (guild && member) {
            member.roles.remove(config.ROLE_ID)
        }
    } catch (error) {
        console.log('Error from addRole:', error)
    }
}