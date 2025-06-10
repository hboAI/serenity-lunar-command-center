import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
interface Topic {
  name: string;
  type: string;
  description: string;
}
interface TopicSelectorProps {
  topics: Topic[];
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
}
const TopicSelector = ({
  topics,
  selectedTopics,
  onTopicsChange
}: TopicSelectorProps) => {
  const handleTopicToggle = (topicName: string) => {
    const updatedTopics = selectedTopics.includes(topicName) ? selectedTopics.filter(t => t !== topicName) : [...selectedTopics, topicName];
    onTopicsChange(updatedTopics);
  };

  // Only show plot topics in the selector since images and pointclouds have their own tabs
  const plotTopics = topics.filter(topic => topic.type === 'plot');
  return <div className="flex flex-wrap gap-4 mb-4">
      {plotTopics.map(topic => <div key={topic.name} className="flex items-center space-x-2 px-0 py-[15px]">
          <Checkbox id={topic.name} checked={selectedTopics.includes(topic.name)} onCheckedChange={() => handleTopicToggle(topic.name)} className="border-white/30 data-[state=checked]:bg-space-cyan data-[state=checked]:border-space-cyan" />
          <Label htmlFor={topic.name} className="text-sm text-white cursor-pointer">
            {topic.name}
          </Label>
        </div>)}
    </div>;
};
export default TopicSelector;