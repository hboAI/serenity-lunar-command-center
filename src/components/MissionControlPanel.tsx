import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Play, Square, RotateCcw, Zap, Thermometer, Gauge, MapPin, RefreshCw } from 'lucide-react';
const MissionControlPanel = () => {
  const [motorIds, setMotorIds] = useState('');
  const [motorGoals, setMotorGoals] = useState('');
  const [selectedMode, setSelectedMode] = useState('0.1');
  const [positionInput, setPositionInput] = useState('');
  const [vertexInput, setVertexInput] = useState('');
  const [amount, setAmount] = useState([1.0]);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [connectionColor, setConnectionColor] = useState('yellow');
  const [goalStatus, setGoalStatus] = useState('Status: Idle');
  const [goalColor, setGoalColor] = useState('gray');
  const modes = [{
    value: '0.1',
    label: 'Direct Motor Control: Position'
  }, {
    value: '0.2',
    label: 'Direct Motor Control: Current'
  }, {
    value: '1.1',
    label: 'Core Position: Coordinates'
  }, {
    value: '1.2',
    label: 'Core Position: Vertex Direction'
  }, {
    value: '1.3',
    label: 'Core Position: Inverted Vertex Direction'
  }, {
    value: '2.1',
    label: 'Goal Position: Coordinates'
  }, {
    value: '2.2',
    label: 'Goal Position: Vertex Direction'
  }, {
    value: '3',
    label: 'Visual Target Mode'
  }, {
    value: '4',
    label: 'Cave Mode'
  }];
  const modesWithoutAmount = ['0.1', '0.2', '1.1', '2.1'];
  const updateControlVisibility = () => {
    const mode = selectedMode;
    return {
      isMotorMode: mode.startsWith('0.'),
      isCoordMode: mode === '1.1' || mode === '2.1',
      isVertexMode: mode === '1.2' || mode === '1.3' || mode === '2.2',
      showAmount: !modesWithoutAmount.includes(mode)
    };
  };
  const getSelectedModeLabel = () => {
    const mode = modes.find(m => m.value === selectedMode);
    return mode ? mode.label : '';
  };
  const getStatusColor = (color: string) => {
    const colorMap: {
      [key: string]: string;
    } = {
      'green': 'text-green-400',
      'yellow': 'text-yellow-400',
      'gray': 'text-gray-400',
      'red': 'text-red-400'
    };
    return colorMap[color] || 'text-gray-400';
  };
  const getIndicatorColor = (color: string) => {
    const colorMap: {
      [key: string]: string;
    } = {
      'green': 'bg-green-400',
      'yellow': 'bg-yellow-400',
      'gray': 'bg-gray-400',
      'red': 'bg-red-400'
    };
    return colorMap[color] || 'bg-gray-400';
  };
  const handleExecute = () => {
    setGoalStatus('Status: Sending command...');
    setGoalColor('yellow');
    // Add your execution logic here
    console.log('Execute command with mode:', selectedMode);
  };
  const handleRelaunch = () => {
    console.log('Relaunch everything');
    // Add relaunch logic here
  };
  const handleStop = () => {
    console.log('Stop action client');
    // Add stop logic here
  };
  const {
    isMotorMode,
    isCoordMode,
    isVertexMode,
    showAmount
  } = updateControlVisibility();
  return <Card className="h-full bg-black/30 backdrop-blur-xl border border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-center font-bold text-4xl">
          Lunar Mission Control
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 text-white">
        {/* System Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Gauge className="w-5 h-5 text-space-cyan" />
            System Status
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getIndicatorColor(connectionColor)}`}></div>
              <span className={`text-base font-medium ${getStatusColor(connectionColor)}`}>
                Connection: {connectionStatus}
              </span>
            </div>
            
            
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Mission Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-space-cyan" />
            Mission Controls
          </h3>
          
          <div className="space-y-3">
            <Label htmlFor="mode-selection" className="text-base font-medium">Operation Mode</Label>
            <Select value={selectedMode} onValueChange={setSelectedMode}>
              <SelectTrigger className="bg-black/40 border-white/30 text-white focus:border-space-cyan focus:ring-space-cyan">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/30">
                {modes.map(mode => <SelectItem key={mode.value} value={mode.value} className="text-white hover:bg-white/10">
                    {mode.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            
            
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Motor Controls - Only show for motor modes */}
        {isMotorMode && <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Gauge className="w-5 h-5 text-space-cyan" />
                Motor Controls
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="motor-ids" className="text-base font-medium">Motor IDs</Label>
                  <Input id="motor-ids" value={motorIds} onChange={e => setMotorIds(e.target.value)} placeholder="e.g., 1 2 3" className="mt-1 bg-black/40 border-white/30 text-white placeholder:text-blue-300/60 focus:border-space-cyan focus:ring-space-cyan" />
                </div>
                
                <div>
                  <Label htmlFor="motor-goals" className="text-base font-medium">Motor Goals</Label>
                  <Input id="motor-goals" value={motorGoals} onChange={e => setMotorGoals(e.target.value)} placeholder="e.g., 1000 1500 2000" className="mt-1 bg-black/40 border-white/30 text-white placeholder:text-blue-300/60 focus:border-space-cyan focus:ring-space-cyan" />
                </div>
              </div>
            </div>
            <Separator className="bg-white/20" />
          </>}

        {/* Position Controls - Only show for coordinate modes */}
        {isCoordMode && <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-space-cyan" />
                Position Controls
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="position-input" className="text-base font-medium">Position Coordinates (x y z)</Label>
                  <Input id="position-input" value={positionInput} onChange={e => setPositionInput(e.target.value)} placeholder="e.g., 0.5 0.0 0.3" className="mt-1 bg-black/40 border-white/30 text-white placeholder:text-blue-300/60 focus:border-space-cyan focus:ring-space-cyan" />
                </div>
              </div>
            </div>
            <Separator className="bg-white/20" />
          </>}

        {/* Vertex Controls - Only show for vertex modes */}
        {isVertexMode && <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-space-cyan" />
                Vertex Controls
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="vertex-input" className="text-base font-medium">Vertex Indices</Label>
                  <Input id="vertex-input" value={vertexInput} onChange={e => setVertexInput(e.target.value)} placeholder="e.g., 0 1 2" className="mt-1 bg-black/40 border-white/30 text-white placeholder:text-blue-300/60 focus:border-space-cyan focus:ring-space-cyan" />
                </div>
              </div>
            </div>
            <Separator className="bg-white/20" />
          </>}

        {/* Amount Slider - Only show for modes that support it */}
        {showAmount && <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-space-cyan" />
                Force Control
              </h3>
              
              <div className="space-y-3">
                <Label className="text-base font-medium">Amount: {amount[0].toFixed(2)}</Label>
                <Slider value={amount} onValueChange={setAmount} max={2.0} min={0.1} step={0.1} className="w-full" />
              </div>
            </div>
            <Separator className="bg-white/20" />
          </>}

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <Button onClick={handleExecute} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 text-base">
              <Play className="w-4 h-4 mr-2" />
              Execute Command
            </Button>
            
            <Button onClick={handleRelaunch} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 text-base">
              <RefreshCw className="w-4 h-4 mr-2" />
              Relaunch
            </Button>
            
            <Button onClick={handleStop} variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium py-2 text-base">
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default MissionControlPanel;