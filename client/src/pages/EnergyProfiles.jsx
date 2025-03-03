import React, { useState } from "react";
import Header from "../components/Header";

const EnergyProfiles = () => {
  const [selectedArea, setSelectedArea] = useState("Area 1");

  const areas = ["Whole Plant", "Area 1", "Area 2", "Area 3"];
  const locations = {
    "Whole Plant": ["Main Hub", "Control Room", "Maintenance"],
    "Area 1": ["Machine A", "Machine B", "Storage"],
    "Area 2": ["Assembly Line", "Warehouse", "Cooling Unit"],
    "Area 3": ["Generator Room", "Backup Storage", "Testing Lab"],
  };

  const [locationModes, setLocationModes] = useState(
    Object.fromEntries(Object.values(locations).flat().map((loc) => [loc, "Always-On"]))
  );

  const selectMode = (location, mode) => {
    setLocationModes({ ...locationModes, [location]: mode });
  };

  return (
    <div className="min-h-screen bg-[#131515] text-[#fffafa] flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row w-[90%] mx-auto py-6 gap-6 h-[calc(100vh-100px)]">

        {/* Areas Sidebar */}
        <div className="w-full md:w-1/4 bg-[#1a1c1e] p-4 rounded-lg overflow-y-auto max-h-[calc(100vh-100px)]">
          <h2 className="text-xl font-semibold mb-4">Areas</h2>
          <ul className="space-y-3">
            {areas.map((area) => (
              <li
                key={area}
                className={`p-3 rounded-md cursor-pointer text-center 
                  ${selectedArea === area ? "bg-[#38b137]" : "bg-[#23272a] hover:bg-[#38b137]"}`}
                onClick={() => setSelectedArea(area)}
              >
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Locations & Modes Section */}
        <div className="w-full md:w-3/4 bg-[#1a1c1e] p-4 rounded-lg overflow-y-auto max-h-[calc(100vh-100px)]">
          <h2 className="text-xl font-semibold mb-4">{selectedArea} Locations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations[selectedArea].map((location) => (
              <div key={location} className="p-4 bg-[#23272a] rounded-lg flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">{location}</h3>
                
                {/* Mode Selection Buttons */}
                <div className="flex gap-2">
                  {["Always-On", "SparkAI mode", "Service"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => selectMode(location, mode)}
                      className={`px-2 py-2 rounded-md text-sm font-semibold 
                        ${locationModes[location] === mode ? 
                          (mode === "SparkAI mode" ? "bg-green-600" : 
                          mode === "Always-On" ? "bg-blue-600" : "bg-yellow-600") 
                          : "bg-[#3a3d40] hover:bg-[#52565a]"}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnergyProfiles;
