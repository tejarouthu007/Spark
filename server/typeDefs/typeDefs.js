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
`;

export default typeDefs;