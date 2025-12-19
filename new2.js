import React, { useState } from 'react';
 
function DynamicModuleLoader({ moduleUrl }) {
  const [moduleData, setModuleData] = useState(null);
  const [error, setError] = useState(null);
 
  const loadModule = async () => {
    try {
      // Dynamic import assumes the server serves the .js file as a module
      const module = await import(moduleUrl); 
      setModuleData(module);
    } catch (e) {
      setError(e);
      console.error("Failed to load module:", e);
    }
  };
 
  return (
    <div>
    <button onClick={loadModule}>Load Module</button>
          {error && <div>Error loading module: {error.message}</div>}
          {moduleData && (
    <div>
    <p>Module loaded successfully!</p>
              {/* Access exported values from the module */}
              {moduleData.someExportedValue && <p>Exported Value: {moduleData.someExportedValue}</p>}
    </div>
          )}
    </div>
  );
}
 
export default DynamicModuleLoader;