import React, { createContext, useContext } from 'react';

export const PetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) { 
  
const states = {
};

const actions = {

};

return (
    <PetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </PetCareContext.Provider>
  ); 
}


export const usePetCareContext = () => useContext(PetCareContext);

