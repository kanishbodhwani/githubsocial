import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Repository } from '../types/Repository';

// Define the shape of the context
interface RepoContextProps {
  repos: Repository[];
  setRepos: React.Dispatch<React.SetStateAction<Repository[]>>;
}

// Create the context
const RepoContext = createContext<RepoContextProps | undefined>(undefined);

// Create a custom provider to wrap around the application
export const RepoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [repos, setRepos] = useState<Repository[]>([]);

  return (
    <RepoContext.Provider value={{ repos, setRepos }}>
      {children}
    </RepoContext.Provider>
  );
};

// Custom hook to access the repo context
export const useRepoContext = () => {
  const context = useContext(RepoContext);
  if (!context) {
    throw new Error('useRepoContext must be used within a RepoProvider');
  }
  return context;
};