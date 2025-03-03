import React, { useState } from "react";
import Header from "../components/Header";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Devices = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Whole Plant");
  const [devices, setDevices] = useState([
    { id: 1, name: "Device 1", area: "Whole Plant", enabled: true, installedDate: "2024-01-10", lastTurnedOn: "2024-03-01 14:30", usageHours: 50, lastUsage: "3.2 kWh", readings: generateReadings() },
    { id: 2, name: "Device 2", area: "Whole Plant", enabled: true, installedDate: "2024-01-10", lastTurnedOn: "2024-03-01 14:30", usageHours: 50, lastUsage: "3.2 kWh", readings: generateReadings() },
    { id: 3, name: "Device 3", area: "Whole Plant", enabled: true, installedDate: "2024-01-10", lastTurnedOn: "2024-03-01 14:30", usageHours: 50, lastUsage: "3.2 kWh", readings: generateReadings() },
    { id: 4, name: "Device 2", area: "Area 1", enabled: false, installedDate: "2023-12-20", lastTurnedOn: "2024-02-20 12:15", usageHours: 80, lastUsage: "2.5 kWh", readings: generateReadings(), deactivatedDate: "2024-02-25" },
    { id: 5, name: "Device 3", area: "Area 2", enabled: true, installedDate: "2024-02-01", lastTurnedOn: "2024-03-02 10:00", usageHours: 100, lastUsage: "4.1 kWh", readings: generateReadings() },
    { id: 6, name: "Device 4", area: "Area 2", enabled: false, installedDate: "2023-11-15", lastTurnedOn: "2024-01-30 18:45", usageHours: 120, lastUsage: "3.9 kWh", readings: generateReadings(), deactivatedDate: "2024-02-10" },
  ]);

  const areas = ["Whole Plant", "Area 1", "Area 2", "Area 3"];
  const filteredDevices = devices.filter(device => device.area === selectedArea);

  function generateReadings() {
    return Array.from({ length: 7 }, (_, i) => ({
      time: `Day ${i + 1}`,
      powerUsage: (Math.random() * 5 + 1).toFixed(2),
    }));
  }

  const handleAddDevice = () => {
    const newId = devices.length + 1;
    const newDeviceName = prompt("Enter new device name:");
    if (newDeviceName) {
      setDevices([...devices, { 
        id: newId, name: newDeviceName, area: selectedArea, enabled: true, 
        installedDate: new Date().toISOString().split('T')[0], lastTurnedOn: new Date().toISOString(), 
        usageHours: 0, lastUsage: "0 kWh", readings: generateReadings(),
      }]);
    }
  };

  const toggleDeviceStatus = (id) => {
    setDevices(devices.map(device => 
      device.id === id 
        ? { ...device, enabled: !device.enabled, deactivatedDate: !device.enabled ? null : new Date().toISOString().split('T')[0] } 
        : device
    ));
  };

  return (
    <div className="min-h-screen bg-[#131515] text-[#fffafa] flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row gap-6 w-[90%] mx-auto py-6">
        
        {/* Devices List */}
        <div className="w-full min-h-[50%] md:w-1/2 bg-[#1a1c1e] p-4 rounded-lg flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Device List</h2>
            <button 
              onClick={handleAddDevice} 
              className="bg-[#38b137] px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700"
            >
              + Add Device
            </button>
          </div>

          {/* Area Dropdown */}
          <select 
            value={selectedArea} 
            onChange={(e) => setSelectedArea(e.target.value)} 
            className="w-full p-2 bg-[#23272a] rounded-md text-white mb-4"
          >
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>

          {/* Device List */}
          <ul className="space-y-3">
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <li 
                  key={device.id} 
                  className={`p-3 rounded-md cursor-pointer flex justify-between items-center 
                    ${selectedDevice === device.id ? "bg-[#1f7a1f]" : "bg-[#23272a] hover:border hover:border-[#1f7a1f]"}`}
                  onClick={() => setSelectedDevice(device.id)}
                >
                  <span>{device.name}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleDeviceStatus(device.id); }}
                    className={`px-3 py-1 rounded-md text-sm font-semibold bg-[#38b137] hover:bg-green-700`}
                  >
                    {device.enabled ? "Disable" : "Enable"}
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No devices in this area.</p>
            )}
          </ul>
        </div>

        {/* Device Readings */}
        <div className="w-full md:w-1/2 bg-[#1a1c1e] p-4 rounded-lg flex-1">
          <h2 className="text-xl font-semibold mb-4">Energy Readings</h2>
          {selectedDevice ? (
            <div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Power Usage Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={devices.find(d => d.id === selectedDevice).readings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                    <XAxis dataKey="time" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip />
                    <Line type="monotone" dataKey="powerUsage" stroke="#38b137" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p><strong>Last Turned On:</strong> {devices.find(d => d.id === selectedDevice).lastTurnedOn}</p>
              <p><strong>Last Power Usage:</strong> {devices.find(d => d.id === selectedDevice).lastUsage}</p>
              <p><strong>Total Usage Hours:</strong> {devices.find(d => d.id === selectedDevice).usageHours} hrs</p>
              <p><strong>Total Power Usage:</strong> {(devices.find(d => d.id === selectedDevice).usageHours * 0.8).toFixed(2)} kWh</p>
              <p><strong>Installed Date:</strong> {devices.find(d => d.id === selectedDevice).installedDate}</p>
              {devices.find(d => d.id === selectedDevice).deactivatedDate && (
                <p className="text-red-400"><strong>Deactivated Date:</strong> {devices.find(d => d.id === selectedDevice).deactivatedDate}</p>
              )}
            </div>
          ) : (
            <p>Select a device to view energy readings.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Devices;
