
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
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/1123e6b1-e446-4086-b579-ce12567a0a30.png" 
              alt="Serenity Logo" 
              className="h-16 md:h-20 object-contain"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Serenity Robot Control
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Lunar Exploration Mission Control Interface
          </p>
          
          {/* Institutional Logos */}
          <div className="flex justify-center items-center space-x-8 mt-8">
            <img 
              src="/lovable-uploads/0f68fd5c-3ad9-4e6f-a774-38e9097cc75a.png" 
              alt="ETH Zurich" 
              className="h-8 md:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
            <img 
              src="/lovable-uploads/f3401fdb-4b25-44cf-94a3-d9af0839f0cb.png" 
              alt="RSL - Robotic Systems Lab" 
              className="h-8 md:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Connection Status */}
        <Card className="glass-panel glow-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-3">
              <div className={`status-indicator ${connectionColor === 'text-green-400' ? 'bg-green-400' : connectionColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className={`text-lg font-medium ${connectionColor}`}>
                {connectionStatus}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Control Panel */}
        <Card className="glass-panel glow-border">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center text-space-cyan">
              Mission Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Selection */}
            <div className="space-y-2">
              <Label htmlFor="mode-select" className="text-lg font-medium text-gray-200">
                Operation Mode
              </Label>
              <Select value={selectedMode} onValueChange={setSelectedMode}>
                <SelectTrigger className="bg-space-lighter border-space-lighter/50 text-white hover:border-space-cyan/50 transition-colors">
                  <SelectValue placeholder="Select operation mode" />
                </SelectTrigger>
                <SelectContent className="bg-space-gray border-space-lighter/50">
                  {modes.map((mode) => (
                    <SelectItem key={mode.value} value={mode.value} className="text-white hover:bg-space-lighter">
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-space-cyan border-space-cyan/50">
                Mode {selectedMode}: {modes.find(m => m.value === selectedMode)?.label}
              </Badge>
            </div>

            <Separator className="bg-space-lighter/50" />

            {/* Position Input */}
            {requiresPosition && (
              <div className="space-y-2">
                <Label htmlFor="position-input" className="text-lg font-medium text-gray-200">
                  Position Coordinates (x, y, z)
                </Label>
                <Input
                  id="position-input"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g., 0.1 0.2 0.3"
                  className="bg-space-lighter border-space-lighter/50 text-white placeholder:text-gray-400 hover:border-space-cyan/50 focus:border-space-cyan transition-colors"
                />
              </div>
            )}

            {/* Vertex Input */}
            {requiresVertex && (
              <div className="space-y-2">
                <Label htmlFor="vertex-input" className="text-lg font-medium text-gray-200">
                  Vertex Indices
                </Label>
                <Input
                  id="vertex-input"
                  value={vertexInput}
                  onChange={(e) => setVertexInput(e.target.value)}
                  placeholder="e.g., 1 2 3"
                  className="bg-space-lighter border-space-lighter/50 text-white placeholder:text-gray-400 hover:border-space-cyan/50 focus:border-space-cyan transition-colors"
                />
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount-input" className="text-lg font-medium text-gray-200">
                Amount (0.0 - 1.0)
              </Label>
              <Input
                id="amount-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 0.5"
                className="bg-space-lighter border-space-lighter/50 text-white placeholder:text-gray-400 hover:border-space-cyan/50 focus:border-space-cyan transition-colors"
              />
            </div>

            <Separator className="bg-space-lighter/50" />

            {/* Send Goal Button */}
            <Button 
              onClick={handleSendGoal}
              className="control-button w-full text-lg py-4"
            >
              Execute Mission Command
            </Button>

            {/* Goal Status */}
            <Card className="bg-space-lighter/50 border-space-lighter/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className={`status-indicator ${goalColor === 'text-green-400' ? 'bg-green-400' : goalColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
                  <span className={`font-medium ${goalColor}`}>
                    {goalStatus}
                  </span>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Robot Visualization */}
        <Card className="glass-panel glow-border">
          <CardHeader>
            <CardTitle className="text-xl text-center text-space-cyan">
              Serenity Platform Status
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-8">
            <div className="relative">
              <img 
                src="/lovable-uploads/0aece87b-78f6-43f7-8668-4336d9728b39.png" 
                alt="Serenity Robot Platform" 
                className="h-64 md:h-80 object-contain opacity-90 hover:opacity-100 transition-opacity filter brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-space-cyan/10 rounded-lg"></div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2024 ETH Zurich - Robotic Systems Lab | Serenity Lunar Exploration Mission</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
