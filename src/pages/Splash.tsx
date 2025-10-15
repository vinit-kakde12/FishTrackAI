import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ocean-gradient">
      <div className="animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <img 
            src={logo} 
            alt="FishTrack AI Logo" 
            className="w-48 h-auto mx-auto drop-shadow-2xl"
          />
        </div>
        <h1 className="text-4xl font-bold text-white text-center mb-3 animate-slide-up">
          FishTrack AI
        </h1>
        <p className="text-lg text-white/90 text-center animate-fade-in px-4" style={{ animationDelay: "0.3s" }}>
          Smart Catch Recognition
        </p>
        <p className="text-sm text-white/80 text-center mt-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          Offline Enabled
        </p>
      </div>
      <div className="absolute bottom-8 animate-pulse-slow">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/60"></div>
          <div className="w-2 h-2 rounded-full bg-white/80"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
