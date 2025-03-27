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
    },
    Mutation: {
        // Device Mutations
        createDevice: async (_, { name, type, manufacturer, model, serial_number, configuration }) => {
            const [result] = await dbpool.query(
                "INSERT INTO devices (name, type, manufacturer, model, serial_number, configuration) VALUES (?, ?, ?, ?, ?, ?)",
                [name, type, manufacturer, model, serial_number, JSON.stringify(configuration)]
            );
            return { id: result.insertId, name, type, manufacturer, model, serial_number, configuration };
        },
        updateDevice: async (_, { id, name, type, manufacturer, model, serial_number, configuration }) => {
            await dbpool.query(
                "UPDATE devices SET name = ?, type = ?, manufacturer = ?, model = ?, serial_number = ?, configuration = ? WHERE id = ?",
                [name, type, manufacturer, model, serial_number, JSON.stringify(configuration), id]
            );
            const [rows] = await dbpool.query("SELECT * FROM devices WHERE id = ?", [id]);
            return rows[0] || null;
        },
        deleteDevice: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM devices WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },

        // Channel Mutations
        createChannel: async (_, { device_id, name, unit, description }) => {
            const [result] = await dbpool.query(
                "INSERT INTO channels (device_id, name, unit, description) VALUES (?, ?, ?, ?)",
                [device_id, name, unit, description]
            );
            return { id: result.insertId, device_id, name, unit, description };
        },
        updateChannel: async (_, { id, name, unit, description }) => {
            await dbpool.query(
                "UPDATE channels SET name = ?, unit = ?, description = ? WHERE id = ?",
                [name, unit, description, id]
            );
            const [rows] = await dbpool.query("SELECT * FROM channels WHERE id = ?", [id]);
            return rows[0] || null;
        },
        deleteChannel: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM channels WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },

        // Data Mutations
        createData: async (_, { channel_id, timestamp, value }) => {
            const [result] = await dbpool.query(
                "INSERT INTO data (channel_id, timestamp, value) VALUES (?, ?, ?)",
                [channel_id, timestamp, value]
            );
            return { id: result.insertId, channel_id, timestamp, value };
        },
        deleteData: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM data WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },

        // User Mutations
        createUser: async (_, { username, password_hash, role }) => {
            const [result] = await dbpool.query(
                "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
                [username, password_hash, role]
            );
            return { id: result.insertId, username, password_hash, role };
        },
        updateUser: async (_, { id, username, password_hash, role }) => {
            await dbpool.query(
                "UPDATE users SET username = ?, password_hash = ?, role = ? WHERE id = ?",
                [username, password_hash, role, id]
            );
            const [rows] = await dbpool.query("SELECT * FROM users WHERE id = ?", [id]);
            return rows[0] || null;
        },
        deleteUser: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },

        // System Configuration Mutations
        updateSystemConfiguration: async (_, { config_key, config_value }) => {
            await dbpool.query(
                "INSERT INTO system_configuration (config_key, config_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE config_value = ?",
                [config_key, config_value, config_value]
            );
            const [rows] = await dbpool.query("SELECT * FROM system_configuration WHERE config_key = ?", [config_key]);
            return rows[0] || null;
        },
        deleteSystemConfiguration: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM system_configuration WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },

        // Energy Production/Consumption Mutations
        createEnergyProduction: async (_, { device_id, timestamp, energy_produced }) => {
            const [result] = await dbpool.query(
                "INSERT INTO energy_production (device_id, timestamp, energy_produced) VALUES (?, ?, ?)",
                [device_id, timestamp, energy_produced]
            );
            return { id: result.insertId, device_id, timestamp, energy_produced };
        },
        createEnergyConsumption: async (_, { device_id, timestamp, energy_consumed }) => {
            const [result] = await dbpool.query(
                "INSERT INTO energy_consumption (device_id, timestamp, energy_consumed) VALUES (?, ?, ?)",
                [device_id, timestamp, energy_consumed]
            );
            return { id: result.insertId, device_id, timestamp, energy_consumed };
        },
        createEnergyStorage: async (_, { device_id, timestamp, state_of_charge, energy_stored }) => {
            const [result] = await dbpool.query(
                "INSERT INTO energy_storage (device_id, timestamp, state_of_charge, energy_stored) VALUES (?, ?, ?, ?)",
                [device_id, timestamp, state_of_charge, energy_stored]
            );
            return { id: result.insertId, device_id, timestamp, state_of_charge, energy_stored };
        },
        deleteEnergyProduction: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM energy_production WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },
        deleteEnergyConsumption: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM energy_consumption WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },
        deleteEnergyStorage: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM energy_storage WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },

        // Event Mutations
        createEvent: async (_, { timestamp, event_type, message, device_id }) => {
            const [result] = await dbpool.query(
                "INSERT INTO events (timestamp, event_type, message, device_id) VALUES (?, ?, ?, ?)",
                [timestamp, event_type, message, device_id]
            );
            return { id: result.insertId, timestamp, event_type, message, device_id };
        },
        deleteEvent: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM events WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },

        // Log Mutations
        createLog: async (_, { timestamp, log_level, message }) => {
            const [result] = await dbpool.query(
                "INSERT INTO logs (timestamp, log_level, message) VALUES (?, ?, ?)",
                [timestamp, log_level, message]
            );
            return { id: result.insertId, timestamp, log_level, message };
        },
        deleteLog: async (_, { id }) => {
            const [result] = await dbpool.query("DELETE FROM logs WHERE id = ?", [id]);
            return result.affectedRows > 0;
        },
    },
};

module.exports = resolvers;