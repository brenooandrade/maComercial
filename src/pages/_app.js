// import '../styles/globals.css'
global.ambiente = 'production';
if (global.ambiente == 'development') {
  global.authGoogle = {
    clientId: process.env.AUTHGOOLECLIENTID,
    clientSecret: process.env.AUTHGOOLECLIENTSECRET,
    authorizationUrl: process.env.AUTHORIZATIONURL,
  };
  global.tokenMP = process.env.TOKENMP;
  global.linkRetornoMP = process.env.LINKRETORNOMP;
  global.linkDashboard = process.env.LINKDASHBOARD;
  global.api = process.env.API;
} else if (global.ambiente == 'development') {
  global.authGoogle = {
    clientId: '612142441301-j3g2itt83ld73cc09brro1nfhsa7onbc.apps.googleusercontent.com',
    clientSecret: 'ZoQ6UgeswMltSol_r4gSLCb5',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
  };
  global.tokenMP = 'TEST-8952990287765540-061620-969fb3326495eed18bdc5d06f04ecef8-775914546';
  global.linkRetornoMP = 'https://link-pagamento-nextjs.vercel.app';
  global.linkDashboard = 'https://searchcloud.com.br/login/primeiro-acesso';
  global.api = 'https://api.searchcloud.com.br';
}

// else if (global.ambiente == 'development') {
//   global.authGoogle = {
//     clientId: '612142441301-j3g2itt83ld73cc09brro1nfhsa7onbc.apps.googleusercontent.com',
//     clientSecret: 'ZoQ6UgeswMltSol_r4gSLCb5',
//     authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
//   };
//   global.tokenMP = 'TEST-8952990287765540-061620-969fb3326495eed18bdc5d06f04ecef8-775914546';
//   global.linkRetornoMP = 'http://localhost:3000/selecione-um-plano/2';
//   global.linkDashboard = 'http://localhost/app.meuarquivo/login/primeiro-acesso';
//   global.api = 'http://localhost:5000';
// }

import './../../styles/globals.css';
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
