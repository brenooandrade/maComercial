import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
export default NextAuth({
    // Configure one or more authentication providers 
    providers: [
        Providers.Google({
            clientId: process.env.AUTHGOOLECLIENTID,
            clientSecret: process.env.AUTHGOOLECLIENTSECRET,
            // authorizationUrl: 'https://accounts.google.com/o/oauth2/auth'
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        }),
        Providers.Facebook({
            clientId: '506957027085535',
            clientSecret: '7d7c45d959678c74558d53ed40a4493f'
        })
        // ...add more providers here
    ],
    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL
})