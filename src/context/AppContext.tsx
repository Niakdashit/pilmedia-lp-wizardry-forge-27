
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  user: any;
  campaigns: any[];
  sidebarCollapsed: boolean;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  user: null,
  campaigns: [],
  sidebarCollapsed: false,
};

function appReducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CAMPAIGNS':
      return { ...state, campaigns: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    default:
      return state;
  }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      dispatch, 
      sidebarCollapsed: state.sidebarCollapsed,
      toggleSidebar 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
