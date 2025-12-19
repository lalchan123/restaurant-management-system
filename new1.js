import React, { useEffect, useState } from 'react';
 
function DynamicScriptLoader({ scriptUrl }) {

  const [scriptContent, setScriptContent] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(() => {

    const fetchAndExecuteScript = async () => {

      try {

        const response = await fetch(scriptUrl);

        if (!response.ok) {

          throw new Error(`HTTP error! status: ${response.status}`);

        }

        const text = await response.text();

        setScriptContent(text);
 
        // Execute the script content

        // Be cautious with 'eval()' as it can be a security risk if the source is untrusted.

        // For safer dynamic script loading, consider using module federation or dynamic imports with a bundler.

        eval(text);
 
      } catch (e) {

        setError(e);

        console.error("Failed to load or execute script:", e);

      }

    };
 
    fetchAndExecuteScript();

  }, [scriptUrl]);
 
  if (error) {

    return <div>Error loading script: {error.message}</div>;

  }
 
  return (
    <div>

        {/* You can display the script content or a message indicating it loaded */}

        {scriptContent ? <p>Script loaded successfully!</p> : <p>Loading script...</p>}
    </div>

  );

}
 
export default DynamicScriptLoader;
 