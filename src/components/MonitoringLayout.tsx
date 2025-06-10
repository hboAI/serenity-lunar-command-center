import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import TopicSelector from './TopicSelector';
import PlotVisualization from './PlotVisualization';
import ImageVisualization from './ImageVisualization';
import PointCloudVisualization from './PointCloudVisualization';
interface MonitoringLayoutProps {
  children: React.ReactNode; // Mission Control Panel
}
const MonitoringLayout = ({
  children
}: MonitoringLayoutProps) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('plots');
  const availableTopics = [{
    name: '/motor_status',
    type: 'plot',
    description: 'Motor positions, currents, velocities'
  }, {
    name: '/lux',
    type: 'plot',
    description: 'Environmental sensors'
  }, {
    name: '/sen66_data',
    type: 'plot',
    description: 'Air quality sensors'
  }, {
    name: '/camera/cam*/ir',
    type: 'image',
    description: 'IR camera feeds (4 cameras)'
  }, {
    name: '/camera/cam*/pointcloud',
    type: 'pointcloud',
    description: 'Point cloud data (4 cameras)'
  }];
  const plotTopics = availableTopics.filter(topic => topic.type === 'plot');
  const imageTopics = availableTopics.filter(topic => topic.type === 'image');
  const pointCloudTopics = availableTopics.filter(topic => topic.type === 'pointcloud');
  return <div className="min-h-screen w-full flex">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        {/* Monitoring Center */}
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="h-full p-4">
            <Card className="h-full bg-black/30 backdrop-blur-xl border border-white/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-5xl px-0">Monitoring Center</CardTitle>
                <TopicSelector topics={availableTopics} selectedTopics={selectedTopics} onTopicsChange={setSelectedTopics} />
              </CardHeader>
              <CardContent className="h-[calc(100%-120px)]">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="grid w-full grid-cols-3 bg-black/40">
                    <TabsTrigger value="plots" className="text-white data-[state=active]:bg-space-cyan">
                      Data Plots
                    </TabsTrigger>
                    <TabsTrigger value="images" className="text-white data-[state=active]:bg-space-cyan">
                      IR Images
                    </TabsTrigger>
                    <TabsTrigger value="pointclouds" className="text-white data-[state=active]:bg-space-cyan">
                      Point Clouds
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="plots" className="h-[calc(100%-60px)] mt-4">
                    <PlotVisualization topics={plotTopics} selectedTopics={selectedTopics.filter(topic => plotTopics.some(pt => pt.name === topic))} />
                  </TabsContent>
                  
                  <TabsContent value="images" className="h-[calc(100%-60px)] mt-4">
                    <ImageVisualization />
                  </TabsContent>
                  
                  <TabsContent value="pointclouds" className="h-[calc(100%-60px)] mt-4">
                    <PointCloudVisualization />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="my-0" />

        {/* Mission Control Panel */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="h-full p-4">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>;
};
export default MonitoringLayout;