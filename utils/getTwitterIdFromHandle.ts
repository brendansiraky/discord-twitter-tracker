import { twitterClient } from './twitterClient'

export async function getTwitterIdFromHandle(handle: string) {
    try {
        const user = await twitterClient.v2.usersByUsernames(handle)
        const userId = user.data[0]?.id
        if (user.data[0]?.id) {
            return userId
        }
    } catch (error) {
        return null
    }

    return null
}