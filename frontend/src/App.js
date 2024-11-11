// import logo from './logo.svg';
import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { useSuperheroes, withSuperheroes } from './context/superheroes';
import './App.css';
import { getSuperheroes } from './services/api.service';
import { useEffect } from 'react';
import { avatarUrl } from './components/superhero';

export async function loader() {
  const loadedSuperheroes = await getSuperheroes();
  if (!loadedSuperheroes) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { loadedSuperheroes };
}

function App() {
  const { value: superheroes, setSuperheroes } = useSuperheroes();

  const { loadedSuperheroes } = useLoaderData();
  useEffect(() => {
    setSuperheroes(loadedSuperheroes);
  }, [loadedSuperheroes]);

  return (
    <div id="App">
      <div id='sidebar'>
        <NavLink to={'superheroes/create'}><button>New Superhero</button></NavLink>
        <div id="listOfHeroes">
          {superheroes.length ? (
            <ul>
              {superheroes.map((superhero) => (
                <li key={superhero._id}>
                  <NavLink
                    to={`superheroes/${superhero._id}`}
                  >
                    {superhero.nickname ? (
                      <>
                        {superhero.nickname}
                        <img src={avatarUrl(superhero.Images[0])} alt='SuperAvatar'/>
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Herous yet!</i>
            </p>
          )}
        </div>
      </div>
      <div id='wrapper'>
        <Outlet />
      </div>
    </div>
  );
}


export default withSuperheroes(App);
