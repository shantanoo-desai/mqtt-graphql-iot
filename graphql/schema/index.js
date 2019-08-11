const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type SensorData {
        temp: Float!
        humid: Float!
        time: String!
    }

    type Subscription {
        subscribe2sensor(topic: String!): SensorData!
    }

    type Sensors {
        id: String!
    }

    type Query {
        sensors: [Sensors!]!
    }

    schema {
        query: Query
        subscription: Subscription
    }
`;

module.exports = { typeDefs };