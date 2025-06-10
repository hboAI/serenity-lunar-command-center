
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

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

const TopicSelector = ({ topics, selectedTopics, onTopicsChange }: TopicSelectorProps) => {
  const handleTopicToggle = (topicName: string) => {
    const newSelection = selectedTopics.includes(topicName)
      ? selectedTopics.filter(t => t !== topicName)
      : [...selectedTopics, topicName];
    onTopicsChange(newSelection);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'plot': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'image': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'pointcloud': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-300 mb-2">Select topics to monitor:</div>
      <div className="grid grid-cols-1 gap-2">
        {topics.map((topic) => (
          <div key={topic.name} className="flex items-center space-x-3 p-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
            <Checkbox
              id={topic.name}
              checked={selectedTopics.includes(topic.name)}
              onCheckedChange={() => handleTopicToggle(topic.name)}
              className="border-white/30"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <label htmlFor={topic.name} className="text-sm font-mono text-white cursor-pointer truncate">
                  {topic.name}
                </label>
                <Badge variant="outline" className={getTypeColor(topic.type)}>
                  {topic.type}
                </Badge>
              </div>
              <div className="text-xs text-gray-400 truncate">{topic.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
