import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryList from './StoryList';
import SearchBar from './SearchBar';
import { fetchTopStories } from '../api/hackerNewsApi';

const HackerNewsApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const filteredStories = stories?.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hacker News Top 100 Stories</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <StoryList stories={filteredStories} isLoading={isLoading} />
    </div>
  );
};

export default HackerNewsApp;