import React, { useEffect, useRef } from 'react';
import bwipjs from 'bwip-js';

function Barcode({ imei }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imei && canvasRef.current) {
      const canvas = canvasRef.current;
      const scale = 2;
      
      // Set the canvas dimensions
      canvas.width = scale * 100;  // Set these dimensions according to your requirements
      canvas.height = scale * 30;

      bwipjs.toCanvas(canvas, {
        bcid: 'code128', 
        text: imei,
        scale: scale,
        height: 6, 
        includetext: true,
        textxalign: 'center',
      }, function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
  }, [imei]);

  if (!imei) {
    return null;
  }

  return  <div style={{width: '100%', paddingLeft: '8px', paddingRight: '8px'}}>
    <canvas ref={canvasRef} style={{width: '100%', height: 'auto'}} />  {/* The CSS width and height here scale the image down if necessary */}
  </div>
}

export default Barcode;
