
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState('Connecting to robot...');
  const [connectionColor, setConnectionColor] = useState('text-yellow-400');
  const [goalStatus, setGoalStatus] = useState('Status: Idle');
  const [goalColor, setGoalColor] = useState('text-gray-400');
  const [selectedMode, setSelectedMode] = useState('0');
  const [position, setPosition] = useState('');
  const [vertexInput, setVertexInput] = useState('');
  const [amount, setAmount] = useState('');

  const modes = [
    { value: '0', label: 'Core Position' },
    { value: '1', label: 'Vertex Direction for Core' },
    { value: '2', label: 'Goal Position' },
    { value: '3', label: 'Vertex Direction for Goal' },
    { value: '4', label: 'Visual Target Mode' },
    { value: '5', label: 'Cave Mode' }
  ];

  useEffect(() => {
    // Simulate connection logic (replace with actual ROS connection)
    const timer = setTimeout(() => {
      setConnectionStatus('Connected to robot on localhost');
      setConnectionColor('text-green-400');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendGoal = () => {
    setGoalStatus('Status: Sending goal...');
    setGoalColor('text-yellow-400');
    
    // Simulate goal processing
    setTimeout(() => {
      setGoalStatus('Status: Goal Succeeded!');
      setGoalColor('text-green-400');
    }, 1500);
  };

  const requiresPosition = selectedMode === '0' || selectedMode === '2';
  const requiresVertex = selectedMode === '1' || selectedMode === '3';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Corner Logos */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src="/lovable-uploads/0f68fd5c-3ad9-4e6f-a774-38e9097cc75a.png" 
          alt="ETH Zurich" 
          className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      
      <div className="absolute top-6 right-6 z-20">
        <img 
          src="/lovable-uploads/f3401fdb-4b25-44cf-94a3-d9af0839f0cb.png" 
          alt="RSL - Robotic Systems Lab" 
          className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Embedded Robot Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-20">
          <img 
            src="/lovable-uploads/0aece87b-78f6-43f7-8668-4336d9728b39.png" 
            alt="Serenity Robot Platform" 
            className="w-full h-full object-contain object-bottom-right filter brightness-75"
          />
        </div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header with Larger White Logo */}
          <div className="text-center space-y-8 pt-8">
            <div className="flex justify-center mb-12">
              <img 
                src="/lovable-uploads/1123e6b1-e446-4086-b579-ce12567a0a30.png" 
                alt="Serenity Logo" 
                className="h-32 md:h-40 object-contain filter brightness-0 invert drop-shadow-lg"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              Serenity Robot Control
            </h1>
            <p className="text-2xl text-gray-200 font-light drop-shadow-lg">
              Lunar Exploration Mission Control Interface
            </p>
          </div>

          {/* Simplified Connection Status */}
          <div className="flex justify-center">
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl px-8 py-4 hover:bg-black/50 transition-all duration-300">
              <div className="flex items-center justify-center space-x-4">
                <div className={`status-indicator ${connectionColor === 'text-green-400' ? 'bg-green-400' : connectionColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                <span className={`text-lg font-medium ${connectionColor} drop-shadow-lg`}>
                  {connectionStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Control Panel */}
          <Card className="bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-black/40 transition-all duration-500">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl text-center text-white drop-shadow-lg">
                Mission Control Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Enhanced Mode Selection */}
              <div className="space-y-4">
                <Label htmlFor="mode-select" className="text-xl font-medium text-gray-100 drop-shadow-lg">
                  Operation Mode
                </Label>
                <Select value={selectedMode} onValueChange={setSelectedMode}>
                  <SelectTrigger className="bg-black/40 border-white/30 text-white hover:border-space-cyan/50 transition-all duration-300 h-14 text-lg backdrop-blur-sm">
                    <SelectValue placeholder="Select operation mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/30 backdrop-blur-xl">
                    {modes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value} className="text-white hover:bg-white/20 focus:bg-white/20 text-lg py-3">
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="text-space-cyan border-space-cyan/50 bg-space-cyan/10 text-lg px-4 py-2">
                  Mode {selectedMode}: {modes.find(m => m.value === selectedMode)?.label}
                </Badge>
              </div>

              <Separator className="bg-white/20" />

              {/* Enhanced Input Fields */}
              {requiresPosition && (
                <div className="space-y-4">
                  <Label htmlFor="position-input" className="text-xl font-medium text-gray-100 drop-shadow-lg">
                    Position Coordinates (x, y, z)
                  </Label>
                  <Input
                    id="position-input"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g., 0.1 0.2 0.3"
                    className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 hover:border-space-cyan/50 focus:border-space-cyan transition-all duration-300 h-14 text-lg backdrop-blur-sm"
                  />
                </div>
              )}

              {requiresVertex && (
                <div className="space-y-4">
                  <Label htmlFor="vertex-input" className="text-xl font-medium text-gray-100 drop-shadow-lg">
                    Vertex Indices
                  </Label>
                  <Input
                    id="vertex-input"
                    value={vertexInput}
                    onChange={(e) => setVertexInput(e.target.value)}
                    placeholder="e.g., 1 2 3"
                    className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 hover:border-space-cyan/50 focus:border-space-cyan transition-all duration-300 h-14 text-lg backdrop-blur-sm"
                  />
                </div>
              )}

              <div className="space-y-4">
                <Label htmlFor="amount-input" className="text-xl font-medium text-gray-100 drop-shadow-lg">
                  Amount (0.0 - 1.0)
                </Label>
                <Input
                  id="amount-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 0.5"
                  className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 hover:border-space-cyan/50 focus:border-space-cyan transition-all duration-300 h-14 text-lg backdrop-blur-sm"
                />
              </div>

              <Separator className="bg-white/20" />

              {/* Enhanced Execute Button */}
              <Button 
                onClick={handleSendGoal}
                className="w-full text-xl py-6 bg-gradient-to-r from-space-cyan to-space-blue hover:from-space-blue hover:to-space-cyan transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-space-cyan/50"
              >
                Execute Mission Command
              </Button>

              {/* Enhanced Status Display */}
              <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-black/50 transition-all duration-300">
                <div className="flex items-center justify-center space-x-4">
                  <div className={`status-indicator ${goalColor === 'text-green-400' ? 'bg-green-400' : goalColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
                  <span className={`font-medium text-lg ${goalColor} drop-shadow-lg`}>
                    {goalStatus}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-gray-300 text-lg pt-8">
            <p className="drop-shadow-lg">© 2024 ETH Zurich - Robotic Systems Lab | Serenity Lunar Exploration Mission</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
