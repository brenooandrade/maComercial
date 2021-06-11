import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: '612142441301-j3g2itt83ld73cc09brro1nfhsa7onbc.apps.googleusercontent.com',
            clientSecret: 'ZoQ6UgeswMltSol_r4gSLCb5',
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        Providers.Email({
            server: {
                host: 'smtplw.com.br',
                port: 465,
                auth: {
                    user: 'copygerais',
                    pass: 'XXscJoZG0633'
                }
            },
            from: 'meuarquivo@meuarquivo.com.br'
        })
        // ...add more providers here
    ],

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
})