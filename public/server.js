"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetch = require('node-fetch');

const {
  ApolloServer,
  gql
} = require('apollo-server');

const start = async () => {
  const typeDefs = gql`
    type Token {
      token_type: String
      access_token: String!
      expires_in: Int
      refresh_token: String
    }

    type SleepData {
      summary_date: String
      period_id: Int
      is_longest: Int
      timezone: Int
      bedtime_start: String
      bedtime_end: String
      score: Int
      score_total: Int
      score_disturbances: Int
      score_efficiency: Int
      score_latency: Int
      score_rem: Int
      score_deep: Int
      score_alignment: Int
      total: Int
      duration: Int
      awake: Int
      light: Int
      rem: Int
      deep: Int
      onset_latency: Int
      restless: Int
      efficiency: Int
      midpoint_time: Int
      hr_lowest: Int
      hr_average: Int
      rmssd: Int
      breath_average: Int
      temperature_delta: Int
      hypnogram_5min: String
      hr_5min: [Int]
      rmssd_5min: [Int]
    }

    type ActivityData {
      summary_date: String
      day_start: String
      day_end: String
      timezone: Int
      score: Int
      score_stay_active: Int
      score_move_every_hour: Int
      score_meet_daily_targets: Int
      score_training_frequency: Int
      score_training_volume: Int
      score_recovery_time: Int
      daily_movement: Int
      non_wear: Int
      rest: Int
      inactive: Int
      inactivity_alerts: Int
      low: Int
      medium: Int
      high: Int
      steps: Int
      cal_total: Int
      cal_active: Int
      met_min_inactive: Int
      met_min_low: Int
      met_min_medium_plus: Int
      met_min_medium: Int
      met_min_high: Int
      average_met: Int
      class_5min: String
      met_1min: [Int]
    }

    type ReadinessData {
      summary_date: String
      period_id: Int
      score: Int
      score_previous_night: Int
      score_sleep_balance: Int
      score_previous_day: Int
      score_activity_balance: Int
      score_resting_hr: Int
      score_recovery_index: Int
      score_temperature: Int
    }

    type Sleep {
      sleep: [SleepData]!
    }

    type Activity {
      activity: [ActivityData]!
    }

    type Readiness {
      readiness: [ReadinessData]!
    }

    union Data = Sleep | Activity | Readiness

    type Query {
      access(code: String!, state: String): Token!
      getData(start: String, end: String, token: String!, type: String!): Data!
    }
  `;
  const resolvers = {
    Query: {
      access: async (root, args, context) => {
        let data;

        try {
          const response = await fetch(`https://cloud.ouraring.com/oauth/token?grant_type=authorization_code&code=${args.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`, {
            method: 'POST'
          });
          data = await response.json();
        } catch (error) {
          return new Error(error);
        }

        console.log(data);

        if (data.code && data.code !== 200) {
          return new Error(data.message);
        }

        return data;
      },
      getData: async (root, args, context) => {
        let data;

        try {
          const response = await fetch(`https://api.ouraring.com/v1/${args.type}?start=${args.start}&end=${args.end}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${args.token}`
            }
          });
          data = await response.json();
        } catch (error) {
          return new Error(error);
        }

        if (data.code && data.code !== 200) {
          return new Error(data.message);
        }

        return data;
      }
    },
    Data: {
      __resolveType(obj, context, info) {
        if (obj.sleep) {
          return 'Sleep';
        }

        if (obj.activity) {
          return 'Activity';
        }

        if (obj.readiness) {
          return 'Readiness';
        }
      }

    }
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });
  const {
    url
  } = await server.listen({
    port: _config.default.port
  });
  console.log(`GQL server ready at ${url}`);
}; // QTXAWCNG3THG2YAUU6YFS2EUXDONYILI


exports.start = start;