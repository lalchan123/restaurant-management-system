import React, { useEffect } from 'react';

function ExternalScriptLoader({ scriptUrl }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true; // Load asynchronously
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, [scriptUrl]);

  return null; // This component doesn't render anything visible
}

export default ExternalScriptLoader;