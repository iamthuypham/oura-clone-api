export const config = {
  secrets: {
    jwt: 'learneverything'
  },
  dbUrl: `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds151752.mlab.com:51752/oura`
}
