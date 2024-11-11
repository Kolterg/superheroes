import React, { useCallback, useMemo } from 'react';
import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks
const SuperHeroesContext = createContext(void 0);

function withSuperheroes(WrappedComponent) {
  return function SuperheroesProvider(props) {
    const [value, setValue] = useState([]);

    const setSuperheroes = useCallback((superheroes) => {
      setValue(superheroes);
    }, []);

    const addSuperhero = useCallback((superhero) => {
        setValue(v => [...v, superhero]);
    }, []);

    const updateSuperhero = useCallback((superhero) => {
      setValue(v => {
        const newValues = [...v];
        newValues.splice(v.findIndex(foundHero => foundHero._id === superhero._id), 1, superhero);
        return newValues;
      });
    }, [])

    const deleteSuperhero = useCallback((superhero) => {
      setValue(v => {
        const newValues = [...v];
        newValues.splice(v.findIndex(foundHero => foundHero._id === superhero._id), 1);
        return newValues;
      });
    }, [])

    const deleteImgSuperhero = useCallback((superheroId, imgName) => {
      setValue(v => {
        const tempHero = v.find(foundHero => foundHero._id === superheroId);
        tempHero.Images.splice(tempHero.Images.indexOf(imgName));

        return [...v];
      });
    }, [])

    const contextValue = useMemo(() => {
        return {
            setSuperheroes,
            addSuperhero,
            updateSuperhero,
            deleteSuperhero,
            deleteImgSuperhero,
            value
        };
    }, [value, addSuperhero, setSuperheroes, updateSuperhero, deleteSuperhero]);

    return (
      <SuperHeroesContext.Provider value={contextValue}>
        <WrappedComponent {...props} />
      </SuperHeroesContext.Provider>
    );
  };
}

const useSuperheroes = () => useContext(SuperHeroesContext);

export { withSuperheroes, useSuperheroes };