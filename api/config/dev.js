export const config = {
  secrets: {
    jwt: 'learneverything'
  },
  dbUrl: `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds151752.mlab.com:51752/oura`
}
