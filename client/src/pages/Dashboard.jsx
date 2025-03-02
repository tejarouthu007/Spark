import React, { useState } from "react";
import Header from "../components/Header";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 20 },
  { name: "Apr", value: 70 },
  { name: "May", value: 40 },
];

const energyData = {
  "Whole Plant": 250,
  "Area 1": 180,
  "Area 2": 90,
  "Area 3": 300,
};

const Dashboard = () => {
  const [selectedArea, setSelectedArea] = useState("Whole Plant");

  return (
    <div className="min-h-screen flex flex-col bg-[#131515] text-[#fffafa]">
      <Header />

      {/* Main Content Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 max-w-[90%] mx-auto flex-grow">
        
        {/* Section 1 - tbd*/}
        <div className="bg-[#1a1c1e] p-4 rounded-lg shadow-lg md:col-span-2">
          <h2 className="text-lg font-bold">Section 1</h2>
          <p>TBD</p>
        </div>

        {/* Section 2 - data */}
        <div className="bg-[#1a1c1e] p-4 rounded-lg shadow-lg md:col-span-8 w-full flex flex-col justify-center items-center">
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fffafa" />
                <YAxis stroke="#fffafa" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#38b137" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <span className="mt-4 text-center text-[#fffafa]">
            Visual Representation of Overall Power Usage
          </span>
        </div>


        {/* Section 3 - dropdown & energy readings */} 
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Section 3.1 - dropdown*/}
          <div className="bg-[#23272a] p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-bold">Select Area</h2>
            <select
              className="bg-[#38b137] text-white p-2 rounded-md cursor-pointer mt-2 w-full"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              {Object.keys(energyData).map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Section 3.2 - Energy readings */}
          <div className="bg-[#23272a] p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-bold">Energy Readings</h2>
            <div className="bg-gray-800 p-4 rounded-md w-full text-center mt-2">
              <p className="text-lg">
                <span className="font-bold">{selectedArea}</span>: 
                <span className="text-[#38b137] font-bold"> {energyData[selectedArea]} kWh</span>
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
