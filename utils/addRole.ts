import { config } from '../config'
import { getGuild } from './getGuild'

export async function addRole(userId: string) {
    try {
        const guild = getGuild()
        const member = guild.members.cache.get(userId)
        if (guild && member) {
            member.roles.add(config.ROLE_ID)
        }
    } catch (error) {
        console.log('Error from addRole:', error)
    }
}