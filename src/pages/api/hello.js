// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.status(200).json({
    'urlAPi': process.env.API,
    'tokenMP': process.env.TOKENMP,
    'linkRetornoMP': process.env.LINKRETORNOMP,
    'linkDashboard': process.env.LINKDASHBOARD,
  })
}
