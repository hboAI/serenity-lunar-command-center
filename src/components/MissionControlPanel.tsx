import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { RefreshCcw, X } from 'lucide-react';
const MissionControlPanel = () => {
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus('Connected to robot on localhost');
      setConnectionColor('text-green-400');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const handleSendGoal = () => {
    setGoalStatus('Status: Sending command...');
    setGoalColor('text-yellow-400');
    const modeValue = selectedMode;
    const [category, subMode] = modeValue.includes('.') ? modeValue.split('.').map(Number) : [parseInt(modeValue, 10), 0];
    console.log(`Executing mode: category=${category}, subMode=${subMode}`);
    if (category === 0) {
      const controlMode = subMode === 1 ? 5 : 0;
      console.log(`Motor control mode: ${controlMode}, IDs: ${motorIds}, Goals: ${motorGoals}`);
    } else {
      const robotMode = category === 1 ? 0 : category === 2 ? 1 : category - 1;
      console.log(`Robot task mode: ${robotMode}, amount: ${amount[0]}`);
      if (subMode === 1) {
        console.log(`Coordinates: ${position}`);
      } else if (subMode === 2 || subMode === 3) {
        console.log(`Vertices: ${vertexInput}, inverted: ${subMode === 3}`);
      }
    }
    setTimeout(() => {
      setGoalStatus('Status: Command sent. Awaiting result...');
      setGoalColor('text-green-400');
    }, 1500);
  };
  const handleReload = () => {
    setGoalStatus('Status: Reloading robot...');
    setGoalColor('text-yellow-400');
    console.log('Reload robot command triggered');
    setTimeout(() => {
      setGoalStatus('Status: Robot reloaded successfully');
      setGoalColor('text-green-400');
    }, 3000);
  };
  const handleCancel = () => {
    setGoalStatus('Status: Canceling command...');
    setGoalColor('text-yellow-400');
    console.log('Cancel command triggered');
    setTimeout(() => {
      setGoalStatus('Status: Command canceled');
      setGoalColor('text-gray-400');
    }, 1000);
  };
  const isMotorMode = selectedMode.startsWith('0.');
  const isCoordMode = selectedMode === '1.1' || selectedMode === '2.1';
  const isVertexMode = selectedMode === '1.2' || selectedMode === '1.3' || selectedMode === '2.2';
  return <Card className="h-full bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-white drop-shadow-lg text-4xl">Lunar Mission Control</CardTitle>
        <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-3">
          <div className="flex items-center justify-center space-x-3">
            <div className={`status-indicator ${connectionColor === 'text-green-400' ? 'bg-green-400' : connectionColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
            <span className={`text-sm font-medium ${connectionColor} drop-shadow-lg`}>
              {connectionStatus}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 text-sm">
        {/* Mode Selection */}
        <div className="space-y-2">
          <Label htmlFor="mode-select" className="text-sm font-medium text-gray-100">
            Operation Mode
          </Label>
          <Select value={selectedMode} onValueChange={setSelectedMode}>
            <SelectTrigger className="bg-black/40 border-white/30 text-white h-10 text-sm">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/30">
              {modes.map(mode => <SelectItem key={mode.value} value={mode.value} className="text-white text-xs py-2">
                  {mode.label}
                </SelectItem>)}
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-space-cyan border-space-cyan/50 bg-space-cyan/10 text-xs px-2 py-1">
            {modes.find(m => m.value === selectedMode)?.label}
          </Badge>
        </div>

        <Separator className="bg-white/20" />

        {/* Motor Control Inputs */}
        {isMotorMode && <div className="space-y-3">
            <Label className="text-sm text-gray-100">Motor IDs</Label>
            <Input value={motorIds} onChange={e => setMotorIds(e.target.value)} placeholder="e.g., 0 1 2" className="bg-black/40 border-white/30 text-white h-8 text-sm" />
            <Label className="text-sm text-gray-100">Motor Goals</Label>
            <Input value={motorGoals} onChange={e => setMotorGoals(e.target.value)} placeholder="e.g., 100 200 300" className="bg-black/40 border-white/30 text-white h-8 text-sm" />
          </div>}

        {/* Position Inputs */}
        {isCoordMode && <div className="space-y-2">
            <Label className="text-sm text-gray-100">Position (x, y, z)</Label>
            <Input value={position} onChange={e => setPosition(e.target.value)} placeholder="e.g., 0.1 0.2 0.3" className="bg-black/40 border-white/30 text-white h-8 text-sm" />
          </div>}

        {/* Vertex Inputs */}
        {isVertexMode && <div className="space-y-2">
            <Label className="text-sm text-gray-100">Vertex Indices</Label>
            <Input value={vertexInput} onChange={e => setVertexInput(e.target.value)} placeholder="e.g., 1 2 3" className="bg-black/40 border-white/30 text-white h-8 text-sm" />
          </div>}

        {/* Amount Slider */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-100">
            Amount: {amount[0].toFixed(1)}
          </Label>
          <div className="px-2 py-3 bg-black/20 rounded-lg border border-space-cyan/30">
            <Slider value={amount} onValueChange={setAmount} max={1.0} min={0.0} step={0.1} className="w-full" />
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Control Buttons */}
        <div className="space-y-2">
          <Button onClick={handleSendGoal} className="w-full text-sm py-4 bg-gradient-to-r from-space-cyan to-space-blue hover:from-space-blue hover:to-space-cyan">
            Execute Command
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleReload} variant="outline" className="text-xs py-2 bg-black/20 border-green-500/50 text-green-400 hover:bg-green-500/20">
              <RefreshCcw className="mr-1 h-3 w-3" />
              Reload
            </Button>
            
            <Button onClick={handleCancel} variant="outline" className="text-xs py-2 bg-black/20 border-red-500/50 text-red-400 hover:bg-red-500/20">
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
          </div>
        </div>

        {/* Status Display */}
        <div className="bg-black/40 border border-white/20 rounded-lg p-3">
          <div className="flex items-center justify-center space-x-3">
            <div className={`status-indicator ${goalColor === 'text-green-400' ? 'bg-green-400' : goalColor === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
            <span className={`font-medium text-xs ${goalColor} drop-shadow-lg`}>
              {goalStatus}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default MissionControlPanel;