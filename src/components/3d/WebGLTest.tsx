"use client";

import { useEffect, useState } from "react";
import Typography from "@/components/atoms/Typography";

const WebGLTest: React.FC = () => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [webglInfo, setWebglInfo] = useState<string>("");

  useEffect(() => {
    // Test WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (gl && (gl as WebGLRenderingContext).getParameter) {
      setWebglSupported(true);
      const webglContext = gl as WebGLRenderingContext;
      const renderer = webglContext.getParameter(webglContext.RENDERER);
      const vendor = webglContext.getParameter(webglContext.VENDOR);
      const version = webglContext.getParameter(webglContext.VERSION);
      setWebglInfo(
        `Renderer: ${renderer}\nVendor: ${vendor}\nVersion: ${version}`
      );
    } else {
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className="p-4 bg-slate-800/30 rounded-lg border border-white/10 mb-4">
      <Typography variant="h5" className="text-white mb-2">
        WebGL Support Test
      </Typography>
      {webglSupported === null ? (
        <Typography variant="body2" className="text-gray-400">
          Testing WebGL support...
        </Typography>
      ) : webglSupported ? (
        <div>
          <Typography variant="body2" className="text-green-400 mb-2">
            ✅ WebGL is supported
          </Typography>
          <Typography
            variant="caption"
            className="text-gray-400 whitespace-pre-line"
          >
            {webglInfo}
          </Typography>
        </div>
      ) : (
        <Typography variant="body2" className="text-red-400">
          ❌ WebGL is not supported
        </Typography>
      )}
    </div>
  );
};

export default WebGLTest;
