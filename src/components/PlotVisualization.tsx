
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Topic {
  name: string;
  type: string;
  description: string;
}

interface PlotVisualizationProps {
  topics: Topic[];
  selectedTopics: string[];
}

const PlotVisualization = ({ topics, selectedTopics }: PlotVisualizationProps) => {
  const [motorData, setMotorData] = useState<any[]>([]);
  const [luxData, setLuxData] = useState<any[]>([]);
  const [sen66Data, setSen66Data] = useState<any[]>([]);

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      
      if (selectedTopics.includes('/motor_status')) {
        setMotorData(prev => [...prev.slice(-19), {
          time: timestamp,
          motor0_pos: Math.random() * 1000,
          motor1_pos: Math.random() * 1000,
          motor0_current: Math.random() * 100,
          motor1_current: Math.random() * 100,
        }]);
      }
      
      if (selectedTopics.includes('/lux')) {
        setLuxData(prev => [...prev.slice(-19), {
          time: timestamp,
          oxygen: 20 + Math.random() * 2,
          temperature: 22 + Math.random() * 5,
          pressure: 1013 + Math.random() * 10,
          percentage: Math.random() * 100,
        }]);
      }
      
      if (selectedTopics.includes('/sen66_data')) {
        setSen66Data(prev => [...prev.slice(-19), {
          time: timestamp,
          pm1p0: Math.random() * 50,
          pm2p5: Math.random() * 75,
          pm10p0: Math.random() * 100,
          humidity: 40 + Math.random() * 20,
          temperature: 20 + Math.random() * 10,
          co2: 400 + Math.random() * 200,
        }]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTopics]);

  const renderMotorPlot = () => (
    <Card className="h-full bg-black/20 border-white/20 max-h-96">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Motor Status</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={motorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
            <YAxis stroke="#9CA3AF" fontSize={10} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="motor0_pos" stroke="#3B82F6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="motor1_pos" stroke="#EF4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="motor0_current" stroke="#10B981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderLuxPlot = () => (
    <Card className="h-full bg-black/20 border-white/20 max-h-96">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Environmental Sensors (LUX)</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={luxData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
            <YAxis stroke="#9CA3AF" fontSize={10} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="oxygen" stroke="#06B6D4" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="temperature" stroke="#F59E0B" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="pressure" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderSen66Plot = () => (
    <Card className="h-full bg-black/20 border-white/20 max-h-96">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Air Quality (SEN66)</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sen66Data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
            <YAxis stroke="#9CA3AF" fontSize={10} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="pm1p0" stroke="#EC4899" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="pm2p5" stroke="#F97316" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="humidity" stroke="#22D3EE" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="co2" stroke="#84CC16" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const selectedPlots = selectedTopics.filter(topic => 
    ['/motor_status', '/lux', '/sen66_data'].includes(topic)
  );

  if (selectedPlots.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-lg mb-2">No plot topics selected</p>
          <p className="text-sm">Select topics from the list above to view data plots</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full grid gap-4 ${selectedPlots.length === 1 ? 'grid-cols-1' : selectedPlots.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'}`}>
      {selectedTopics.includes('/motor_status') && renderMotorPlot()}
      {selectedTopics.includes('/lux') && renderLuxPlot()}
      {selectedTopics.includes('/sen66_data') && renderSen66Plot()}
    </div>
  );
};

export default PlotVisualization;
