import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import RobotModelViewer from '@/components/RobotModelViewer';

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState('Connecting to robot...');
  const [connectionColor, setConnectionColor] = useState('text-yellow-400');
  const [goalStatus, setGoalStatus] = useState('Status: Idle');
  const [goalColor, setGoalColor] = useState('text-gray-400');
  const [selectedMode, setSelectedMode] = useState('0');
  const [position, setPosition] = useState('');
  const [vertexInput, setVertexInput] = useState('');
  const [amount, setAmount] = useState([0.5]);
  
  // New state for additional controls
  const [robotPower, setRobotPower] = useState(false);
  const [ledPower, setLedPower] = useState(false);
  const [selectedLED, setSelectedLED] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [rosbagDirectory, setRosbagDirectory] = useState('/home/user/rosbags');
  const [launchMode, setLaunchMode] = useState('Launch-All');

  const modes = [
    { value: '0', label: 'Core Position' },
    { value: '1', label: 'Vertex Direction for Core' },
    { value: '2', label: 'Goal Position' },
    { value: '3', label: 'Vertex Direction for Goal' },
    { value: '4', label: 'Visual Target Mode' },
    { value: '5', label: 'Cave Mode' }
  ];

  const ledOptions = [
    { value: 'chaser-1', label: 'Chaser-1-Animation' },
    { value: 'chaser-2', label: 'Chaser-2-Animation' },
    { value: 'startup', label: 'Startup-Animation' },
    { value: 'stop', label: 'Stop' }
  ];

  const launchModes = [
    { value: 'Launch-All', label: 'Launch-All' },
    { value: 'Launch_no_mamba', label: 'Launch_no_mamba' },
    { value: 'Launch_no_mamba_tof', label: 'Launch_no_mamba_tof' }
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

  const handlePowerToggle = () => {
    setRobotPower(!robotPower);
    // TODO: Send power command to robot
  };

  const handleLedPowerToggle = () => {
    setLedPower(!ledPower);
    if (!ledPower) {
      setSelectedLED('');
    }
    // TODO: Send LED power command to robot
  };

  const handleLEDCommand = () => {
    if (selectedLED) {
      // TODO: Send LED command to robot
      console.log(`Sending LED command: ${selectedLED}`);
    }
  };

  const handleRosbagToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // TODO: Send stop rosbag command
      console.log('Stopping rosbag recording');
    } else {
      // Start recording
      setIsRecording(true);
      // TODO: Send start rosbag command with directory
      console.log(`Starting rosbag recording in: ${rosbagDirectory}`);
    }
  };

  const handleDirectorySelect = () => {
    // TODO: Implement file picker - for now just show a simple dialog
    const newPath = prompt('Enter rosbag directory path:', rosbagDirectory);
    if (newPath) {
      setRosbagDirectory(newPath);
    }
  };

  const requiresPosition = selectedMode === '0' || selectedMode === '2';
  const requiresVertex = selectedMode === '1' || selectedMode === '3';

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
        {/* Header with Logo */}
        <div className="text-center space-y-8 pt-8 mb-12">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/1123e6b1-e446-4086-b579-ce12567a0a30.png" 
              alt="Serenity Logo" 
              className="h-32 md:h-40 object-contain filter brightness-0 invert drop-shadow-lg"
            />
          </div>
          
          <p className="text-xl text-gray-200 font-light drop-shadow-lg">
            Lunar Exploration Mission Control Interface
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl px-8 py-4 hover:bg-black/50 transition-all duration-300">
            <div className="flex items-center justify-center space-x-4">
              <div className={`status-indicator ${connectionColor === 'text-green-400' ? 'bg-green-400' : connectionColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className={`text-lg font-medium ${connectionColor} drop-shadow-lg`}>
                {connectionStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Main Layout - Updated for better horizontal space usage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Robot Model Section - Takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <RobotModelViewer />
          </div>

          {/* Mission Control Panel - Takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <Card className="bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-black/40 transition-all duration-500 h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-center text-white drop-shadow-lg">
                  Mission Control Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Power and LED Controls Row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Robot Power */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-100">
                      Robot Power
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={robotPower}
                        onCheckedChange={handlePowerToggle}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className={`text-sm font-medium ${robotPower ? 'text-green-400' : 'text-gray-400'}`}>
                        {robotPower ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  {/* LED Power */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-100">
                      LED Control
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={ledPower}
                        onCheckedChange={handleLedPowerToggle}
                        className="data-[state=checked]:bg-blue-500"
                      />
                      <span className={`text-sm font-medium ${ledPower ? 'text-blue-400' : 'text-gray-400'}`}>
                        {ledPower ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* LED Animation Options - Only show when LED is ON */}
                {ledPower && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-100">
                      LED Animation
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                      <Select value={selectedLED} onValueChange={setSelectedLED}>
                        <SelectTrigger className="bg-black/40 border-white/30 text-white hover:border-space-cyan/50 transition-all duration-300 h-10 text-sm backdrop-blur-sm">
                          <SelectValue placeholder="Select animation" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-white/30 backdrop-blur-xl">
                          {ledOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/20 focus:bg-white/20 text-sm py-1">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        onClick={handleLEDCommand}
                        disabled={!selectedLED}
                        size="sm"
                        className="bg-gradient-to-r from-space-cyan to-space-blue hover:from-space-blue hover:to-space-cyan transition-all duration-300"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                )}

                <Separator className="bg-white/20" />

                {/* Launch Mode and Rosbag Row */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Launch Mode */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-100">
                      Launch Mode
                    </Label>
                    <Select value={launchMode} onValueChange={setLaunchMode}>
                      <SelectTrigger className="bg-black/40 border-white/30 text-white hover:border-space-cyan/50 transition-all duration-300 h-10 text-sm backdrop-blur-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/30 backdrop-blur-xl">
                        {launchModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value} className="text-white hover:bg-white/20 focus:bg-white/20 text-sm py-1">
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rosbag Recording */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-100">
                      Rosbag Recording
                    </Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={rosbagDirectory}
                          onChange={(e) => setRosbagDirectory(e.target.value)}
                          placeholder="Directory path"
                          className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 hover:border-space-cyan/50 focus:border-space-cyan transition-all duration-300 h-10 text-sm backdrop-blur-sm flex-1"
                          disabled={isRecording}
                        />
                        <Button 
                          onClick={handleDirectorySelect}
                          disabled={isRecording}
                          size="sm"
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Browse
                        </Button>
                      </div>
                      <Button 
                        onClick={handleRosbagToggle}
                        size="sm"
                        className={`w-full transition-all duration-300 ${
                          isRecording 
                            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                            : 'bg-gradient-to-r from-space-cyan to-space-blue hover:from-space-blue hover:to-space-cyan'
                        }`}
                      >
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                      </Button>
                      {isRecording && (
                        <div className="flex items-center space-x-2 text-red-400">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-xs">Recording...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                {/* Mode Selection */}
                <div className="space-y-2">
                  <Label htmlFor="mode-select" className="text-sm font-medium text-gray-100">
                    Operation Mode
                  </Label>
                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger className="bg-black/40 border-white/30 text-white hover:border-space-cyan/50 transition-all duration-300 h-10 text-sm backdrop-blur-sm">
                      <SelectValue placeholder="Select operation mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/30 backdrop-blur-xl">
                      {modes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value} className="text-white hover:bg-white/20 focus:bg-white/20 text-sm py-1">
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge variant="outline" className="text-space-cyan border-space-cyan/50 bg-space-cyan/10 text-xs px-2 py-1">
                    Mode {selectedMode}: {modes.find(m => m.value === selectedMode)?.label}
                  </Badge>
                </div>

                {/* Input Fields */}
                {requiresPosition && (
                  <div className="space-y-2">
                    <Label htmlFor="position-input" className="text-sm font-medium text-gray-100">
                      Position (x, y, z)
                    </Label>
                    <Input
                      id="position-input"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="e.g., 0.1 0.2 0.3"
                      className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 hover:border-space-cyan/50 focus:border-space-cyan transition-all duration-300 h-10 text-sm backdrop-blur-sm"
                    />
                  </div>
                )}

                {requiresVertex && (
                  <div className="space-y-2">
                    <Label htmlFor="vertex-input" className="text-sm font-medium text-gray-100">
                      Vertex Indices
                    </Label>
                    <Input
                      id="vertex-input"
                      value={vertexInput}
                      onChange={(e) => setVertexInput(e.target.value)}
                      placeholder="e.g., 1 2 3"
                      className="bg-black/40 border-white/30 text-white placeholder:text-gray-300 hover:border-space-cyan/50 focus:border-space-cyan transition-all duration-300 h-10 text-sm backdrop-blur-sm"
                    />
                  </div>
                )}

                {/* Amount Slider */}
                <div className="space-y-2">
                  <Label htmlFor="amount-slider" className="text-sm font-medium text-gray-100">
                    Amount: {amount[0].toFixed(1)}
                  </Label>
                  <div className="px-3 py-3 bg-black/20 rounded-xl border border-space-cyan/30 hover:border-space-cyan/50 transition-all duration-300">
                    <Slider
                      id="amount-slider"
                      value={amount}
                      onValueChange={setAmount}
                      max={1.0}
                      min={0.0}
                      step={0.1}
                      className="w-full [&_.slider-track]:bg-space-cyan/20 [&_.slider-range]:bg-space-cyan [&_.slider-thumb]:bg-space-cyan [&_.slider-thumb]:border-space-cyan"
                    />
                    <div className="flex justify-between text-xs text-space-cyan mt-1">
                      <span>0.0</span>
                      <span>0.5</span>
                      <span>1.0</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                {/* Execute Button */}
                <Button 
                  onClick={handleSendGoal}
                  className="w-full text-sm py-4 bg-gradient-to-r from-space-cyan to-space-blue hover:from-space-blue hover:to-space-cyan transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-space-cyan/50"
                >
                  Execute Mission Command
                </Button>

                {/* Status Display */}
                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-3 hover:bg-black/50 transition-all duration-300">
                  <div className="flex items-center justify-center space-x-3">
                    <div className={`status-indicator ${goalColor === 'text-green-400' ? 'bg-green-400' : goalColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
                    <span className={`font-medium text-sm ${goalColor} drop-shadow-lg`}>
                      {goalStatus}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-300 text-lg pt-8 mt-12">
          <p className="drop-shadow-lg">© Serenity Robotics | The Most Significant Spherical Robot</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
