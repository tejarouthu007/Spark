import { JSONResolver, DateTimeResolver } from "graphql-scalars";

const resolvers = {
    JSON: JSONResolver,
    DateTime: DateTimeResolver,
    Query: {
        // Device Resolvers
        getDevice: (_, { id }) => null, // TODO: Fetch device by ID
        getAllDevices: () => [], // TODO: Fetch all devices

        // Channel Resolvers
        getChannel: (_, { id }) => null, // TODO: Fetch channel by ID
        getAllChannels: () => [], // TODO: Fetch all channels

        // Data Resolvers
        getData: (_, { id }) => null, // TODO: Fetch data by ID
        getDataByChannel: (_, { channel_id }) => [], // TODO: Fetch all data by channel ID

        // User Resolvers
        getUser: (_, { id }) => null, // TODO: Fetch user by ID
        getAllUsers: () => [], // TODO: Fetch all users

        // System Configuration Resolvers
        getSystemConfiguration: (_, { config_key }) => null, // TODO: Fetch system config by key
        getAllSystemConfigurations: () => [], // TODO: Fetch all system configs

        // Energy Production Resolvers
        getEnergyProduction: (_, { id }) => null, // TODO: Fetch energy production by ID
        getEnergyProductionByDevice: (_, { device_id }) => [], // TODO: Fetch by device ID

        // Energy Consumption Resolvers
        getEnergyConsumption: (_, { id }) => null, // TODO: Fetch energy consumption by ID
        getEnergyConsumptionByDevice: (_, { device_id }) => [], // TODO: Fetch by device ID

        // Energy Storage Resolvers
        getEnergyStorage: (_, { id }) => null, // TODO: Fetch energy storage by ID
        getEnergyStorageByDevice: (_, { device_id }) => [], // TODO: Fetch by device ID

        // Event Resolvers
        getEvent: (_, { id }) => null, // TODO: Fetch event by ID
        getEventsByDevice: (_, { device_id }) => [], // TODO: Fetch events by device ID
        getAllEvents: () => [], // TODO: Fetch all events

        // Log Resolvers
        getLog: (_, { id }) => null, // TODO: Fetch log by ID
        getLogsByLevel: (_, { log_level }) => [], // TODO: Fetch logs by level
        getAllLogs: () => [], // TODO: Fetch all logs
    }
};

export default resolvers;
