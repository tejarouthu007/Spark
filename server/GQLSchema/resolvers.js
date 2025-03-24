const { JSONResolver, DateTimeResolver } = require("graphql-scalars");
const mysql = require("mysql2/promise")

const dbpool = mysql.createPool({
    host: 'localhost',
    user: 'graphql_user',
    password: 'graphql',
    database: 'openems',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const resolvers = {
    JSON: JSONResolver,
    DateTime: DateTimeResolver,
    Query: {
        // Device Resolvers
        getDevice: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM devices WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getAllDevices: async () => {
            const [rows] = await dbpool.query("SELECT * FROM devices");
            return rows;
        },

        // Channel Resolvers
        getChannel: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM channels WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getAllChannels: async () => {
            const [rows] = await dbpool.query("SELECT * FROM channels");
            return rows;
        },

        // Data Resolvers
        getData: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM data WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getDataByChannel: async (_, { channel_id }) => {
            const [rows] = await dbpool.query("SELECT * FROM data WHERE channel_id = ?", [channel_id]);
            return rows;
        },

        // User Resolvers
        getUser: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM users WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getAllUsers: async () => {
            const [rows] = await dbpool.query("SELECT * FROM users");
            return rows;
        },

        // System Configuration Resolvers
        getSystemConfiguration: async (_, { config_key }) => {
            const [rows] = await dbpool.query("SELECT * FROM system_configuration WHERE config_key = ?", [config_key]);
            return rows[0] || null;
        },
        getAllSystemConfigurations: async () => {
            const [rows] = await dbpool.query("SELECT * FROM system_configuration");
            return rows;
        },

        // Energy Production Resolvers
        getEnergyProduction: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM energy_production WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getEnergyProductionByDevice: async (_, { device_id }) => {
            const [rows] = await dbpool.query("SELECT * FROM energy_production WHERE device_id = ?", [device_id]);
            return rows;
        },

        // Energy Consumption Resolvers
        getEnergyConsumption: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM energy_consumption WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getEnergyConsumptionByDevice: async (_, { device_id }) => {
            const [rows] = await dbpool.query("SELECT * FROM energy_consumption WHERE device_id = ?", [device_id]);
            return rows;
        },

        // Energy Storage Resolvers
        getEnergyStorage: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM energy_storage WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getEnergyStorageByDevice: async (_, { device_id }) => {
            const [rows] = await dbpool.query("SELECT * FROM energy_storage WHERE device_id = ?", [device_id]);
            return rows;
        },

        // Event Resolvers
        getEvent: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM events WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getEventsByDevice: async (_, { device_id }) => {
            const [rows] = await dbpool.query("SELECT * FROM events WHERE device_id = ?", [device_id]);
            return rows;
        },
        getAllEvents: async () => {
            const [rows] = await dbpool.query("SELECT * FROM events");
            return rows;
        },

        // Log Resolvers
        getLog: async (_, { id }) => {
            const [rows] = await dbpool.query("SELECT * FROM logs WHERE id = ?", [id]);
            return rows[0] || null;
        },
        getLogsByLevel: async (_, { log_level }) => {
            const [rows] = await dbpool.query("SELECT * FROM logs WHERE log_level = ?", [log_level]);
            return rows;
        },
        getAllLogs: async () => {
            const [rows] = await dbpool.query("SELECT * FROM logs");
            return rows;
        },
    }
};

module.exports = resolvers;