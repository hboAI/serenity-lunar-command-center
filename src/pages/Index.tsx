
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { RefreshCcw, X } from 'lucide-react';

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState('Connecting to robot...');
  const [connectionColor, setConnectionColor] = useState('text-yellow-400');
  const [goalStatus, setGoalStatus] = useState('Status: Idle');
  const [goalColor, setGoalColor] = useState('text-gray-400');
  const [selectedMode, setSelectedMode] = useState('0.1');
  const [motorIds, setMotorIds] = useState('');
  const [motorGoals, setMotorGoals] = useState('');
  const [position, setPosition] = useState('');
  const [vertexInput, setVertexInput] = useState('');
  const [amount, setAmount] = useState([0.5]);

  const modes = [
    { value: '0.1', label: 'Direct Motor Control: Position' },
    { value: '0.2', label: 'Direct Motor Control: Current' },
    { value: '1.1', label: 'Core Position: Coordinates' },
    { value: '1.2', label: 'Core Position: Vertex Direction' },
    { value: '1.3', label: 'Core Position: Inverted Vertex Direction' },
    { value: '2.1', label: 'Goal Position: Coordinates' },
    { value: '2.2', label: 'Goal Position: Vertex Direction' },
    { value: '3', label: 'Visual Target Mode' },
    { value: '4', label: 'Cave Mode' }
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
    setGoalStatus('Status: Sending command...');
    setGoalColor('text-yellow-400');
    
    // Simulate goal processing
    setTimeout(() => {
      setGoalStatus('Status: Command sent. Awaiting result...');
      setGoalColor('text-green-400');
    }, 1500);
  };

  const handleReload = () => {
    setGoalStatus('Status: Reloading robot...');
    setGoalColor('text-yellow-400');
    
    // Simulate reload process
    setTimeout(() => {
      setGoalStatus('Status: Robot reloaded successfully');
      setGoalColor('text-green-400');
    }, 3000);
  };

  const handleCancel = () => {
    setGoalStatus('Status: Canceling command...');
    setGoalColor('text-yellow-400');
    
    // Simulate cancel process
    setTimeout(() => {
      setGoalStatus('Status: Command canceled');
      setGoalColor('text-gray-400');
    }, 1000);
  };

  const isMotorMode = selectedMode.startsWith('0.');
  const isCoordMode = selectedMode === '1.1' || selectedMode === '2.1';
  const isVertexMode = selectedMode === '1.2' || selectedMode === '1.3' || selectedMode === '2.2';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Corner Logos */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src="/lovable-uploads/03f0f802-f1fa-4cfc-86b1-d9a0cc73f98e.png" 
          alt="RSL - Robotic Systems Lab" 
          className="h-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
        />
      </div>
      
      <div className="absolute top-6 right-6 z-20">
        <img 
          src="/lovable-uploads/66b1167b-bb43-4ffc-9b2c-db26285e5756.png" 
          alt="White Logo" 
          className="h-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-8 pt-8">
            <div className="flex justify-center mb-12">
              <img 
                src="/lovable-uploads/1123e6b1-e446-4086-b579-ce12567a0a30.png" 
                alt="Serenity Logo" 
                className="h-48 md:h-56 object-contain filter brightness-0 invert drop-shadow-lg"
              />
            </div>
            
            <p className="text-2xl text-gray-200 font-light drop-shadow-lg">
              Lunar Exploration Mission Control Interface
            </p>
          </div>

          {/* Connection Status */}
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

          {/* Control Panel */}
          <Card className="bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-black/40 transition-all duration-500">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl text-center text-white drop-shadow-lg">
                Mission Control Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Mode Selection */}
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
                  {modes.find(m => m.value === selectedMode)?.label}
                </Badge>
              </div>

              <Separator className="bg-white/20" />

              {/* Motor Control Inputs */}
              {isMotorMode && (
                <div className="space-y-4">
                  <Label htmlFor="motor-ids" className="text-xl font-medium text-gray-100 drop-shadow-lg">
                    Motor IDs (space-separated)
                  </Label>
                  <Input
                    id="motor-ids"
                    value={motorIds}
                    onChange={(e) => setMotorIds(e.target.value)}
                    placeholder="e.g., 0 1 2"
                    className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 hover:border-space-cyan/50 focus:border-space-cyan transition-all duration-300 h-14 text-lg backdrop-blur-sm"
                  />
                  <Label htmlFor="motor-goals" className="text-xl font-medium text-gray-100 drop-shadow-lg">
                    Motor Goals (space-separated)
                  </Label>
                  <Input
                    id="motor-goals"
                    value={motorGoals}
                    onChange={(e) => setMotorGoals(e.target.value)}
                    placeholder="e.g., 100 200 300"
                    className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 hover:border-space-cyan/50 focus:border-space-cyan transition-all duration-300 h-14 text-lg backdrop-blur-sm"
                  />
                </div>
              )}

              {/* Position Inputs */}
              {isCoordMode && (
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

              {/* Vertex Inputs */}
              {isVertexMode && (
                <div className="space-y-4">
                  <Label htmlFor="vertex-input" className="text-xl font-medium text-gray-100 drop-shadow-lg">
                    Vertex Indices (1 to 3)
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

              {/* Amount Input */}
              <div className="space-y-4">
                <Label htmlFor="amount-slider" className="text-xl font-medium text-gray-100 drop-shadow-lg">
                  Amount: {amount[0].toFixed(1)}
                </Label>
                <div className="px-4 py-6 bg-black/20 rounded-xl border border-space-cyan/30 hover:border-space-cyan/50 transition-all duration-300">
                  <Slider
                    id="amount-slider"
                    value={amount}
                    onValueChange={setAmount}
                    max={1.0}
                    min={0.0}
                    step={0.1}
                    className="w-full [&_.slider-track]:bg-space-cyan/20 [&_.slider-range]:bg-space-cyan [&_.slider-thumb]:bg-space-cyan [&_.slider-thumb]:border-space-cyan"
                  />
                  <div className="flex justify-between text-sm text-space-cyan mt-2">
                    <span>0.0</span>
                    <span>0.5</span>
                    <span>1.0</span>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              {/* Control Buttons */}
              <div className="space-y-4">
                <Button 
                  onClick={handleSendGoal}
                  className="w-full text-xl py-6 bg-gradient-to-r from-space-cyan to-space-blue hover:from-space-blue hover:to-space-cyan transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-space-cyan/50"
                >
                  Execute Mission Command
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleReload}
                    variant="outline"
                    className="text-lg py-4 bg-black/20 border-green-500/50 text-green-400 hover:bg-green-500/20 hover:border-green-400 transition-all duration-300"
                  >
                    <RefreshCcw className="mr-2 h-5 w-5" />
                    Reload Robot
                  </Button>
                  
                  <Button 
                    onClick={handleCancel}
                    variant="outline"
                    className="text-lg py-4 bg-black/20 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
                  >
                    <X className="mr-2 h-5 w-5" />
                    Cancel Command
                  </Button>
                </div>
              </div>

              {/* Status Display */}
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
            <p className="drop-shadow-lg">© Serenity Robotics | The Most Significant Spherical Robot</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
