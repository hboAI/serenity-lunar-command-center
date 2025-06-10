import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Play, Square, RotateCcw, Zap, Thermometer, Gauge, MapPin } from 'lucide-react';
const MissionControlPanel = () => {
  const [motorIds, setMotorIds] = useState('');
  const [motorGoals, setMotorGoals] = useState('');
  const [selectedMode, setSelectedMode] = useState('autonomous');
  return <Card className="h-full bg-black/30 backdrop-blur-xl border border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-2xl text-center font-bold">
          Lunar Mission Control
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 text-white">
        {/* System Status */}
        

        

        {/* Mission Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-space-cyan" />
            Mission Controls
          </h3>
          
          <div className="space-y-3">
            <Label htmlFor="mode-selection" className="text-base font-medium">Operation Mode</Label>
            <RadioGroup value={selectedMode} onValueChange={setSelectedMode} className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="autonomous" id="autonomous" className="border-space-cyan text-space-cyan" />
                <Label htmlFor="autonomous" className="text-sm cursor-pointer">Autonomous Navigation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" className="border-space-cyan text-space-cyan" />
                <Label htmlFor="manual" className="text-sm cursor-pointer">Manual Control</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standby" id="standby" className="border-space-cyan text-space-cyan" />
                <Label htmlFor="standby" className="text-sm cursor-pointer">Standby Mode</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Motor Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Gauge className="w-5 h-5 text-space-cyan" />
            Motor Controls
          </h3>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="motor-ids" className="text-sm font-medium">Motor IDs</Label>
              <Input id="motor-ids" value={motorIds} onChange={e => setMotorIds(e.target.value)} placeholder="e.g., 1,2,3" className="mt-1 bg-black/40 border-white/30 text-white placeholder:text-blue-300/60 focus:border-space-cyan focus:ring-space-cyan" />
            </div>
            
            <div>
              <Label htmlFor="motor-goals" className="text-sm font-medium">Motor Goals</Label>
              <Input id="motor-goals" value={motorGoals} onChange={e => setMotorGoals(e.target.value)} placeholder="e.g., 1000,1500,2000" className="mt-1 bg-black/40 border-white/30 text-white placeholder:text-blue-300/60 focus:border-space-cyan focus:ring-space-cyan" />
            </div>
          </div>
        </div>

        

        {/* Mission Progress */}
        

        

        {/* Action Buttons */}
        <div className="space-y-3">
          
          <div className="grid grid-cols-1 gap-3">
            <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 text-base">
              <Play className="w-4 h-4 mr-2" />
              Start Mission
            </Button>
            
            
            
            <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium py-2">
              <RotateCcw className="w-4 h-4 mr-2" />
              Emergency Stop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default MissionControlPanel;