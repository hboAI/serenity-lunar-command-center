import React from 'react';
import MonitoringLayout from '@/components/MonitoringLayout';
import MissionControlPanel from '@/components/MissionControlPanel';
const Index = () => {
  return <div className="min-h-screen relative overflow-hidden">
      {/* Corner Logos */}
      <div className="absolute top-6 left-6 z-20">
        <img alt="Serenity Logo" src="/lovable-uploads/5bdfc386-c196-4f88-9303-fe4a0ce7c808.png" className="h-16 opacity-70 hover:opacity-100 transition-opacity duration-300 object-contain filter brightness-0 invert" />
      </div>
      
      <div className="absolute top-6 right-6 z-20">
        <img src="/lovable-uploads/03f0f802-f1fa-4cfc-86b1-d9a0cc73f98e.png" alt="RSL - Robotic Systems Lab" className="h-16 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-20">
        <MonitoringLayout>
          <MissionControlPanel />
        </MonitoringLayout>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <p className="text-gray-300 drop-shadow-lg text-center py-[22px] text-xl">
          © Serenity Robotics | The Most Significant Spherical Robot
        </p>
      </div>
    </div>;
};
export default Index;