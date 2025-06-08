
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RobotModelViewer } from '@/components/RobotModelViewer';
import {
  Play,
  Square,
  RotateCcw,
  Settings,
  Activity,
  Zap,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  FileText,
  Shield,
  Cpu,
  Radio,
} from 'lucide-react';

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedMode, setSelectedMode] = useState('1');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [bufferSize, setBufferSize] = useState([1024]);
  const [compression, setCompression] = useState(false);
  const [realTimeMode, setRealTimeMode] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modes = [
    { value: '1', label: 'Autonomous Navigation' },
    { value: '2', label: 'Manual Control' },
    { value: '3', label: 'Surveillance Mode' },
    { value: '4', label: 'Emergency Response' },
    { value: '5', label: 'Training Mode' },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Start recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    // Stop recording logic here
  };

  const handleReset = () => {
    setRecordingTime(0);
    // Reset logic here
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <TooltipProvider>
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-10 h-10 text-sky-400" />
              <h1 className="text-4xl font-bold text-slate-50 glow-text">
                AUTONOMOUS SYSTEMS CONTROL
              </h1>
            </div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Advanced robotics control interface for mission-critical operations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - 3D Model */}
            <div className="space-y-6">
              <Card className="tech-border">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-200">
                    <Cpu className="w-5 h-5 text-sky-400" />
                    System Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
                    <RobotModelViewer />
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="tech-border">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-200">
                    <Activity className="w-5 h-5 text-green-400" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Power</span>
                        <div className="status-indicator bg-green-400"></div>
                      </div>
                      <Progress value={85} className="h-2" />
                      <span className="text-xs text-slate-400">85% Operational</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Network</span>
                        <div className="status-indicator bg-sky-400"></div>
                      </div>
                      <Progress value={92} className="h-2" />
                      <span className="text-xs text-slate-400">92% Signal</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-slate-200">
                        {formatTime(recordingTime)}
                      </div>
                      <div className="text-xs text-slate-400">Mission Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-sky-400">ACTIVE</div>
                      <div className="text-xs text-slate-400">Status</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-400">SECURE</div>
                      <div className="text-xs text-slate-400">Connection</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Controls */}
            <div className="space-y-6">
              {/* Mission Control */}
              <Card className="tech-border">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-200">
                    <Radio className="w-5 h-5 text-sky-400" />
                    Mission Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Control Buttons */}
                  <div className="flex gap-4">
                    {!isRecording ? (
                      <Button 
                        onClick={handleStartRecording} 
                        className="control-button flex-1"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        DEPLOY
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleStopRecording} 
                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex-1"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        HALT
                      </Button>
                    )}
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            onClick={handleReset} 
                            className="secondary-button"
                            disabled={isRecording}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Reset Mission</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button className="secondary-button">
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Open Logs
                    </Button>
                  </div>

                  {/* Mode Selection */}
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium">Operation Mode</Label>
                    <Select value={selectedMode} onValueChange={setSelectedMode}>
                      <SelectTrigger className="tech-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {modes.map((mode) => (
                          <SelectItem 
                            key={mode.value} 
                            value={mode.value}
                            className="text-slate-200 focus:bg-slate-700 focus:text-slate-100"
                          >
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="output-file" className="text-slate-300 font-medium">
                        Output File
                      </Label>
                      <Input
                        id="output-file"
                        placeholder="mission_data.bag"
                        className="tech-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="save-location" className="text-slate-300 font-medium">
                        Save Location
                      </Label>
                      <Input
                        id="save-location"
                        placeholder="/missions/logs/"
                        className="tech-input"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topics" className="text-slate-300 font-medium">
                      Data Channels
                    </Label>
                    <Textarea
                      id="topics"
                      placeholder="/nav/odometry /sensors/lidar /camera/rgb"
                      rows={3}
                      className="tech-input"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card className="tech-border">
                <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="pb-4 cursor-pointer hover:bg-slate-800/30 transition-colors rounded-t-lg">
                      <CardTitle className="flex items-center justify-between text-slate-200">
                        <div className="flex items-center gap-2">
                          <Settings className="w-5 h-5 text-slate-400" />
                          Advanced Configuration
                        </div>
                        {isAdvancedOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-6 pt-0">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <Label className="text-slate-300 font-medium">
                            Buffer Size: {bufferSize[0]} MB
                          </Label>
                          <Slider
                            value={bufferSize}
                            onValueChange={setBufferSize}
                            max={4096}
                            min={256}
                            step={256}
                            className="w-full"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label className="text-slate-300 font-medium">
                            Data Compression
                          </Label>
                          <Switch
                            checked={compression}
                            onCheckedChange={setCompression}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label className="text-slate-300 font-medium">
                            Real-time Processing
                          </Label>
                          <Switch
                            checked={realTimeMode}
                            onCheckedChange={setRealTimeMode}
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-slate-300 font-medium">Security Protocols</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="encryption" defaultChecked />
                              <Label htmlFor="encryption" className="text-sm text-slate-300">
                                End-to-end encryption
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="auth" defaultChecked />
                              <Label htmlFor="auth" className="text-sm text-slate-300">
                                Multi-factor authentication
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="audit" />
                              <Label htmlFor="audit" className="text-sm text-slate-300">
                                Audit trail logging
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Index;
