import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  // New state for vertex and position selection
  const [selectedVertices, setSelectedVertices] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isVertexDialogOpen, setIsVertexDialogOpen] = useState(false);
  const [isPositionDialogOpen, setIsPositionDialogOpen] = useState(false);
  const [positionInput, setPositionInput] = useState('');

  // New state for Control Release functionality
  const [isControlReleaseDialogOpen, setIsControlReleaseDialogOpen] = useState(false);
  const [controlReleaseAction, setControlReleaseAction] = useState('');
  const [selectedCircle, setSelectedCircle] = useState<number | null>(null);

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
    { value: 'startup', label: 'Startup-Animation' }
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

  const handleOpenLogs = () => {
    // TODO: Implement log viewer functionality
    console.log('Opening logs...');
  };

  // New handlers for vertex and position selection
  const handleVertexSelect = (vertexIndex: number) => {
    if (selectedVertices.includes(vertexIndex)) {
      setSelectedVertices(selectedVertices.filter(v => v !== vertexIndex));
    } else if (selectedVertices.length < 3) {
      setSelectedVertices([...selectedVertices, vertexIndex]);
    }
  };

  const handleVertexConfirm = () => {
    if (selectedVertices.length >= 2) {
      setVertexInput(selectedVertices.join(' '));
      setIsVertexDialogOpen(false);
    }
  };

  const handlePositionConfirm = () => {
    setSelectedPosition(positionInput);
    setPosition(positionInput);
    setIsPositionDialogOpen(false);
  };

  // New handlers for Control Release functionality
  const handleControlReleaseAction = (action: string) => {
    setControlReleaseAction(action);
    if (action === 'open' || action === 'close') {
      setSelectedCircle(null); // Reset circle selection when switching actions
    } else {
      // For power off all, execute immediately
      handleControlReleaseExecute(action);
    }
  };

  const handleCircleSelect = (circleIndex: number) => {
    setSelectedCircle(circleIndex);
  };

  const handleControlReleaseExecute = (action?: string) => {
    const actionToExecute = action || controlReleaseAction;
    
    if ((actionToExecute === 'open' || actionToExecute === 'close') && selectedCircle !== null) {
      console.log(`Executing Control Release: ${actionToExecute} circle ${selectedCircle}`);
      setIsControlReleaseDialogOpen(false);
      setControlReleaseAction('');
      setSelectedCircle(null);
    } else if (actionToExecute === 'power off all') {
      console.log('Executing Control Release: Power off all');
      setIsControlReleaseDialogOpen(false);
      setControlReleaseAction('');
    }
  };

  const requiresPosition = selectedMode === '0' || selectedMode === '2';
  const requiresVertex = selectedMode === '1' || selectedMode === '3';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
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
          
          <p className="text-xl text-slate-300 font-light">
            Lunar Exploration Mission Control Interface
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-lg px-8 py-4 hover:bg-slate-900/80 transition-all duration-300">
            <div className="flex items-center justify-center space-x-4">
              <div className={`status-indicator ${connectionColor === 'text-green-400' ? 'bg-green-400' : connectionColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className={`text-lg font-medium ${connectionColor}`}>
                {connectionStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {/* Robot Model Section - Takes 3/4 of the space on larger screens */}
          <div className="xl:col-span-3">
            <RobotModelViewer />
          </div>

          {/* Mission Control Panel - Takes 1/4 of the space on larger screens */}
          <div className="xl:col-span-1">
            <Card className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 shadow-2xl h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-center text-slate-100">
                  Mission Control Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Power and LED Controls Row */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Robot Power */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-200">
                      Robot Power
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={robotPower}
                        onCheckedChange={handlePowerToggle}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className={`text-sm font-medium ${robotPower ? 'text-green-400' : 'text-slate-400'}`}>
                        {robotPower ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  {/* LED Power */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-200">
                      LED Control
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={ledPower}
                        onCheckedChange={handleLedPowerToggle}
                        className="data-[state=checked]:bg-blue-500"
                      />
                      <span className={`text-sm font-medium ${ledPower ? 'text-blue-400' : 'text-slate-400'}`}>
                        {ledPower ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* LED Animation Options - Only show when LED is ON */}
                {ledPower && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-200">
                      LED Animation
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                      <Select value={selectedLED} onValueChange={setSelectedLED}>
                        <SelectTrigger className="bg-slate-800/60 border-slate-600 text-slate-100 hover:border-blue-400/50 transition-all duration-300 h-10 text-sm">
                          <SelectValue placeholder="Select animation" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 backdrop-blur-sm">
                          {ledOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-slate-100 hover:bg-slate-800 focus:bg-slate-800 text-sm py-1">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        onClick={handleLEDCommand}
                        disabled={!selectedLED}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                )}

                <Separator className="bg-slate-700" />

                {/* Launch Mode and Rosbag Row */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Launch Mode */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-200">
                      Launch Mode
                    </Label>
                    <Select value={launchMode} onValueChange={setLaunchMode}>
                      <SelectTrigger className="bg-slate-800/60 border-slate-600 text-slate-100 hover:border-blue-400/50 transition-all duration-300 h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 backdrop-blur-sm">
                        {launchModes.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value} className="text-slate-100 hover:bg-slate-800 focus:bg-slate-800 text-sm py-1">
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rosbag Recording */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-200">
                      Rosbag Recording
                    </Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={rosbagDirectory}
                          onChange={(e) => setRosbagDirectory(e.target.value)}
                          placeholder="Directory path"
                          className="bg-slate-800/60 border-slate-600 text-slate-100 placeholder:text-slate-400 hover:border-blue-400/50 focus:border-blue-400 transition-all duration-300 h-10 text-sm flex-1"
                          disabled={isRecording}
                        />
                        <Button 
                          onClick={handleDirectorySelect}
                          disabled={isRecording}
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-200 hover:bg-slate-800"
                        >
                          Browse
                        </Button>
                      </div>
                      <Button 
                        onClick={handleRosbagToggle}
                        size="sm"
                        className={`w-full transition-all duration-300 ${
                          isRecording 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
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

                <Separator className="bg-slate-700" />

                {/* Mode Selection */}
                <div className="space-y-2">
                  <Label htmlFor="mode-select" className="text-sm font-medium text-slate-200">
                    Operation Mode
                  </Label>
                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger className="bg-slate-800/60 border-slate-600 text-slate-100 hover:border-blue-400/50 transition-all duration-300 h-10 text-sm">
                      <SelectValue placeholder="Select operation mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 backdrop-blur-sm">
                      {modes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value} className="text-slate-100 hover:bg-slate-800 focus:bg-slate-800 text-sm py-1">
                          {mode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Vertex Selection for modes 1 and 3 */}
                {requiresVertex && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-200">
                      Vertex Selection
                    </Label>
                    <Dialog open={isVertexDialogOpen} onOpenChange={setIsVertexDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-800">
                          Select Vertices {selectedVertices.length > 0 && `(${selectedVertices.length} selected)`}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
                        <DialogHeader>
                          <DialogTitle>Select Vertices (2-3 required)</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-6 gap-3 p-4">
                          {Array.from({ length: 12 }, (_, i) => (
                            <button
                              key={i}
                              onClick={() => handleVertexSelect(i)}
                              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                                selectedVertices.includes(i)
                                  ? 'bg-red-500 border-red-400 text-white'
                                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-red-400 hover:bg-slate-700'
                              }`}
                              disabled={!selectedVertices.includes(i) && selectedVertices.length >= 3}
                            >
                              {i}
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-between items-center p-4 pt-0">
                          <span className="text-sm text-slate-400">
                            Selected: {selectedVertices.length}/3
                          </span>
                          <Button 
                            onClick={handleVertexConfirm}
                            disabled={selectedVertices.length < 2}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Confirm Selection
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {vertexInput && (
                      <div className="text-sm text-slate-400">
                        Selected vertices: {vertexInput}
                      </div>
                    )}
                  </div>
                )}

                {/* Position Selection for modes 0 and 2 */}
                {requiresPosition && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-200">
                      Position Selection
                    </Label>
                    <Dialog open={isPositionDialogOpen} onOpenChange={setIsPositionDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-800">
                          Select Position {selectedPosition && '(Set)'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
                        <DialogHeader>
                          <DialogTitle>Enter Position Coordinates</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 p-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-slate-200">
                              Coordinates (x,y,z)
                            </Label>
                            <Input
                              value={positionInput}
                              onChange={(e) => setPositionInput(e.target.value)}
                              placeholder="e.g., 1,2,3"
                              className="bg-slate-800/60 border-slate-600 text-slate-100 placeholder:text-slate-400"
                            />
                            <p className="text-xs text-slate-400">
                              Enter coordinates separated by commas
                            </p>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setIsPositionDialogOpen(false)}
                              className="border-slate-600 text-slate-200 hover:bg-slate-800"
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handlePositionConfirm}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={!positionInput.trim()}
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {selectedPosition && (
                      <div className="text-sm text-slate-400">
                        Position: {selectedPosition}
                      </div>
                    )}
                  </div>
                )}

                {/* Amount Slider */}
                <div className="space-y-2">
                  <Label htmlFor="amount-slider" className="text-sm font-medium text-slate-200">
                    Amount: {amount[0].toFixed(1)}
                  </Label>
                  <div className="px-3 py-3 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-300">
                    <Slider
                      id="amount-slider"
                      value={amount}
                      onValueChange={setAmount}
                      max={1.0}
                      min={0.0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>0.0</span>
                      <span>0.5</span>
                      <span>1.0</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-700" />

                {/* Control Release Button */}
                <Dialog open={isControlReleaseDialogOpen} onOpenChange={setIsControlReleaseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="w-full text-sm py-3 border-slate-600 text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition-all duration-300"
                    >
                      Control Release
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700 text-slate-100">
                    <DialogHeader>
                      <DialogTitle>Control Release Options</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 p-4">
                      {/* Action Selection */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-200">
                          Select Action
                        </Label>
                        <div className="grid grid-cols-1 gap-2">
                          <Button
                            variant={controlReleaseAction === 'open' ? 'default' : 'outline'}
                            onClick={() => handleControlReleaseAction('open')}
                            className={controlReleaseAction === 'open' 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'border-slate-600 text-slate-200 hover:bg-slate-800'
                            }
                          >
                            Open
                          </Button>
                          <Button
                            variant={controlReleaseAction === 'close' ? 'default' : 'outline'}
                            onClick={() => handleControlReleaseAction('close')}
                            className={controlReleaseAction === 'close' 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'border-slate-600 text-slate-200 hover:bg-slate-800'
                            }
                          >
                            Close
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleControlReleaseAction('power off all')}
                            className="border-slate-600 text-slate-200 hover:bg-slate-800"
                          >
                            Power Off All
                          </Button>
                        </div>
                      </div>

                      {/* Circle Selection for Open and Close Actions */}
                      {(controlReleaseAction === 'open' || controlReleaseAction === 'close') && (
                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-slate-200">
                            Select Circle (0-5)
                          </Label>
                          <div className="grid grid-cols-3 gap-3">
                            {Array.from({ length: 6 }, (_, i) => (
                              <button
                                key={i}
                                onClick={() => handleCircleSelect(i)}
                                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200 ${
                                  selectedCircle === i
                                    ? 'bg-blue-500 border-blue-400 text-white'
                                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-blue-400 hover:bg-slate-700'
                                }`}
                              >
                                {i}
                              </button>
                            ))}
                          </div>
                          <div className="flex justify-end">
                            <Button 
                              onClick={() => handleControlReleaseExecute()}
                              disabled={selectedCircle === null}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Execute {controlReleaseAction === 'open' ? 'Open' : 'Close'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Open Logs Button */}
                <Button 
                  onClick={handleOpenLogs}
                  variant="outline"
                  className="w-full text-sm py-3 border-slate-600 text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition-all duration-300"
                >
                  Open Logs
                </Button>

                {/* Execute Button */}
                <Button 
                  onClick={handleSendGoal}
                  className="w-full text-sm py-4 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-500 transform hover:scale-105 shadow-lg"
                >
                  Execute Mission Command
                </Button>

                {/* Status Display */}
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-lg p-3 hover:bg-slate-800/60 transition-all duration-300">
                  <div className="flex items-center justify-center space-x-3">
                    <div className={`status-indicator ${goalColor === 'text-green-400' ? 'bg-green-400' : goalColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-slate-400'}`}></div>
                    <span className={`font-medium text-sm ${goalColor}`}>
                      {goalStatus}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-lg pt-8 mt-12">
          <p>© Serenity Robotics | The Most Significant Spherical Robot</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
