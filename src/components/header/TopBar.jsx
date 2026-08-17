import React from "react";
import {
  PhoneCall,
  AlertTriangle,
  Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const TopBar = () => {
  const { user } = useAuth();

  const handleWhatsAppEmergency = (e) => {
    e.preventDefault();

    const targetPhone = "918102946894";

    if (!navigator.geolocation) {
      toast.error(
        "Geolocation is not supported by your browser"
      );

      window.open(
        `https://wa.me/${targetPhone}?text=${encodeURIComponent(
          "🚨 WEFD EMERGENCY SOS ALERT!"
        )}`,
        "_blank"
      );

      return;
    }

    toast.loading(
      "Acquiring high-accuracy GPS coordinates...",
      {
        id: "gps-lock",
      }
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        toast.dismiss("gps-lock");

        const {
          latitude,
          longitude,
          accuracy,
        } = position.coords;

        const googleMapsLink =
          `https://maps.google.com/?q=${latitude},${longitude}`;

        const emergencyMessage = `🚨 *WEFD EMERGENCY DISASTER SOS*

👤 *User:* ${
          user?.username || "Emergency Victim"
        }

📍 *Latitude:* ${latitude.toFixed(6)}
📍 *Longitude:* ${longitude.toFixed(6)}

🎯 *GPS Precision:* ~${Math.round(
          accuracy
        )}m

🗺️ *Live Google Maps:*
${googleMapsLink}

⚠️ *Immediate assistance required!*`;

        const whatsappUrl =
          `https://wa.me/${targetPhone}?text=${encodeURIComponent(
            emergencyMessage
          )}`;

        window.open(
          whatsappUrl,
          "_blank"
        );

        toast.success(
          "Emergency GPS location prepared for WhatsApp!"
        );
      },

      (error) => {
        toast.dismiss("gps-lock");

        console.error(
          "Geolocation error:",
          error
        );

        toast.error(
          "Location permission unavailable."
        );

        const fallbackMessage = `🚨 *WEFD EMERGENCY DISASTER SOS*

👤 *User:* ${
          user?.username || "Emergency Victim"
        }

⚠️ *Location permission unavailable.*

🚨 *Immediate assistance required!*`;

        window.open(
          `https://wa.me/${targetPhone}?text=${encodeURIComponent(
            fallbackMessage
          )}`,
          "_blank"
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="p-3 bg-slate-950 border-b border-slate-800 text-slate-300 text-[14px] font-mono text- -xlpy-1.5 text sm:px-8 ">
      <div className="max-w-7xl mx-auto justify-between flex items-center">

        {/* LEFT — Emergency Ticker */}
        <div className="flex items-center space-x-2 truncate">

          <span className="px-2 py-0.5 gap-1 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-bold flex items-center animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            <span>LIVE </span>
          </span>

          <span className="text-slate-400 truncate hidden sm:inline">
            WEFD Satellite Telemetry Online • Radar Active Across Emergency Nodes
          </span>

        </div>

        {/* RIGHT — QUICK ACTIONS */}
        <div className="flex items-center space-x-4">

          {/* Control Room Email */}
          <a
            href="mailto:control@wefd.org"
            className="hidden lg:flex items-center space-x-1 hover:text-blue-400 transition"
          >
            <Mail className="w-3 h-3 text-blue-400" />
            <span>
              mdtabishfiroz04@gmail.com
            </span>
          </a>

          {/* WhatsApp GPS */}
          <button
            type="button"
            onClick={handleWhatsAppEmergency}
            title="Share precise GPS location to WhatsApp"
            className="text-emerald-400 font-semibold flex items-center space-x-1.5 hover:text-emerald-300 transition"
          >
            <FaWhatsapp className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          {/* SOS 112 */}
          <a
            href="tel:112"
            title="Call emergency services"
            className="text-red-400 font-bold flex items-center space-x-1.5 hover:text-red-300 transition"
          >
            <PhoneCall className="w-3 h-3 animate-bounce" />
            <span>SOS: 112</span>
          </a>

        </div>
      </div>
    </div>
  );
};

export default TopBar;