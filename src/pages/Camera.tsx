import { useState, useRef, useEffect } from "react";
import { Camera as CameraIcon, RotateCcw, Zap, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BottomNav from "@/components/BottomNav";

const Camera = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showLightWarning, setShowLightWarning] = useState(false);
  const [stream, setStream] = useState(null);
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Please allow permission or try another browser.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // ⚡ Toggle Torch (with Lightning Icon)
  const handleTorchToggle = async () => {
    if (!stream) return;

    const track = stream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();

    if (!capabilities.torch) {
      alert("Torch not supported on this device/browser.");
      return;
    }

    try {
      await track.applyConstraints({
        advanced: [{ torch: !torchOn }],
      });
      setTorchOn(!torchOn);
    } catch (err) {
      console.error("Torch toggle failed:", err);
      alert("Unable to toggle flash. Try another device or browser.");
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    setCapturedImage(dataURL);
    stopCamera();
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleAnalyze = () => {
    navigate("/result", { state: { image: capturedImage } });
  };

  return (
    <div className="min-h-screen pb-24 bg-foreground/5 flex flex-col justify-between">
      {/* Camera Area */}
      <div className="relative flex-1 flex items-center justify-center bg-gradient-to-b from-foreground/10 to-foreground/5">
        {!capturedImage ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />

        {/* ⚡ Lightning Icon for Torch Toggle */}
        {!capturedImage && (
          <button
            onClick={handleTorchToggle}
            className={`absolute top-4 left-4 p-3 rounded-full shadow-md backdrop-blur-md transition
              ${torchOn ? "bg-yellow-400 text-white" : "bg-black/40 text-yellow-300 hover:bg-black/60"}`}
            title="Toggle Flashlight"
          >
            <Zap size={22} className={`${torchOn ? "animate-pulse" : ""}`} />
          </button>
        )}

        {/* Low Light Warning */}
        {showLightWarning && (
          <div className="absolute top-4 left-4 right-4 mt-12">
            <Alert className="bg-warning/10 border-warning">
              <Zap className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning font-medium">
                Low Light Detected — Adjust Lighting
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-28 left-0 right-0 px-6">
        {!capturedImage ? (
          <div className="relative max-w-md mx-auto flex items-center justify-center">
            {/* Capture Button - Center */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
              <Button
                onClick={handleCapture}
                size="lg"
                className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(0,123,189,0.6)] hover:scale-110 transition-transform flex items-center justify-center"
              >
                <CameraIcon size={34} />
                <span className="absolute inset-0 rounded-full ring-4 ring-blue-300/40 animate-pulse-slow"></span>
              </Button>
            </div>

            {/* Upload Button - Right Side */}
            <div className="absolute right-0 bottom-2 flex flex-col items-center">
              <label className="cursor-pointer flex flex-col items-center gap-1 text-primary text-sm font-medium hover:text-blue-600 transition">
                <div className="w-14 h-14 bg-gradient-to-tr from-blue-100 to-cyan-100 flex items-center justify-center rounded-full shadow-md hover:scale-105 transition">
                  <Upload size={22} className="text-blue-500" />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 w-full max-w-md mx-auto animate-fade-in">
            <Button
              onClick={handleRetake}
              variant="outline"
              className="flex-1 h-14 border-2"
            >
              <RotateCcw className="mr-2" size={20} />
              Retake
            </Button>
            <Button
              onClick={handleAnalyze}
              className="flex-1 h-14 ocean-gradient text-white btn-shadow"
            >
              Analyze
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Camera;
