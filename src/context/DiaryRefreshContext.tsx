import React, { createContext, useContext, useRef } from "react";

type RefreshFn = () => void;
type DiaryRefreshContextType = {
  setRefresh: (fn: RefreshFn) => void;
  refresh: () => void;
};

const DiaryRefreshContext = createContext<DiaryRefreshContextType>({
  setRefresh: () => {},
  refresh: () => {},
});

export const useDiaryRefresh = () => useContext(DiaryRefreshContext);

export const DiaryRefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const refreshRef = useRef<RefreshFn>(() => {});

  const setRefresh = (fn: RefreshFn) => {
    refreshRef.current = fn;
  };

  const refresh = () => {
    refreshRef.current();
  };

  return (
    <DiaryRefreshContext.Provider value={{ setRefresh, refresh }}>
      {children}
    </DiaryRefreshContext.Provider>
  );
};