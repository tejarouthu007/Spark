import { gql } from "@apollo/server";

const typeDefs = gql`
    scalar JSON
    scalar DateTime

    type Device {
        id: Int!
        name: String!
        type: String!
        manufacturer: String
        model: String
        serial_number: String
        configuration: JSON
    }

    type Channel {
        id: Int!
        device_id: Int!
        name: String!
        unit: String
        description: String
    }

    type Data {
        id: Int!
        channel_id: Int!
        timestamp: DateTime!
        value: Float!
    }

    type User {
        id: Int!
        username: String!
        password_hash: String!
        role: Role!
    }
    enum Role {
        admin
        user
        guest
    }

    type SystemConfiguration {
        id: Int!
        config_key: String!
        config_value: String
    }

    type EnergyProduction {
        id: Int!
        device_id: Int!
        timestamp: DateTime!
        energy_produced: Float!
    }

    type EnergyConsumption {
        id: Int!
        device_id: Int!
        timestamp: DateTime!
        energy_consumed: Float!
    }

    type EnergyStorage {
        id: Int!
        device_id: Int!
        timestamp: DateTime!
        state_of_charge: Float!
        energy_stored: Float!
    }

    type Event {
        id: Int!
        timestamp: DateTime!
        event_type: EventType!
        message: String
        device_id: Int
    }
    enum EventType {
        ALARM
        WARNING
        INFO
    }

    type Log {
        id: Int!
        timestamp: DateTime!
        log_level: LogLevel!
        message: String
    }
    enum LogLevel {
        DEBUG
        INFO
        ERROR
    }

    type Query {
        # fetch device by ID
        getDevice(id: Int!): Device

        # all devices
        getAllDevices: [Device!]!

        # channel by ID
        getChannel(id: Int!): Channel

        # all channels
        getAllChannels: [Channel!]!

        # data by ID or by channel ID
        getData(id: Int!): Data
        getDataByChannel(channel_id: Int!): [Data!]!

        # user by ID
        getUser(id: Int!): User
        # all users
        getAllUsers: [User!]!

        # system configuration by key
        getSystemConfiguration(config_key: String!): SystemConfiguration

        # all system configurations
        getAllSystemConfigurations: [SystemConfiguration!]!

        # energy production by ID or device ID
        getEnergyProduction(id: Int!): EnergyProduction
        getEnergyProductionByDevice(device_id: Int!): [EnergyProduction!]!

        # energy consumption by ID or device ID
        getEnergyConsumption(id: Int!): EnergyConsumption
        getEnergyConsumptionByDevice(device_id: Int!): [EnergyConsumption!]!

        # energy storage by ID or device ID
        getEnergyStorage(id: Int!): EnergyStorage
        getEnergyStorageByDevice(device_id: Int!): [EnergyStorage!]!

        # events by ID or device ID
        getEvent(id: Int!): Event
        getEventsByDevice(device_id: Int!): [Event!]!

        # all events
        getAllEvents: [Event!]!

        # logs by ID or log level
        getLog(id: Int!): Log
        getLogsByLevel(log_level: LogLevel!): [Log!]!
        
        # all logs
        getAllLogs: [Log!]!
    }
`;

export default typeDefs;