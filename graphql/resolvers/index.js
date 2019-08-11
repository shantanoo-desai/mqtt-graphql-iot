const { MQTTPubSub } = require('graphql-mqtt-subscriptions');
const { connect } = require('mqtt');

const client = connect('mqtt://mqtt.eclipse.org', {
    reconnectPeriod: 1000
});

const pubsub = new MQTTPubSub({
    client
});

const resolvers = {
    Query: {
        sensors: () => {
            return [{id: "Sensor1"}, {id: "Sensor2"}];
        }
    },
    Subscription: {
        subscribe2sensor: {
            resolve: (payload) => {
                return {
                    temp: payload.data.temp,
                    humid: payload.data.humid,
                    time: new Date(payload.data.time * 1000).toISOString()
                };
            },
            subscribe: (_, args) => pubsub.asyncIterator([args.topic])
        }
    }
}

module.exports = { resolvers };