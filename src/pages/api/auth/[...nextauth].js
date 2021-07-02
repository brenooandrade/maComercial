import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google(global.authGoogle),
        Providers.Facebook({
            clientId: '506957027085535',
            clientSecret: '7d7c45d959678c74558d53ed40a4493f'
        }),
        Providers.Email({
            server: {
                host: 'smtp.timoderna.com.br',
                port: 465,
                auth: {
                    user: 'naoresponda@timoderna.com.br',
                    pass: '#Eli@$123'
                }
            },
            from: 'naoresponda@timoderna.com.br'
        })
        // ...add more providers here
    ],
    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL
})