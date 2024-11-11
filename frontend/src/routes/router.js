import { createBrowserRouter } from 'react-router-dom'
import App, { loader as superheroesLoader }  from '../App'
import ErrorPage from '../error-page'
import Superhero from '../components/superhero'
import EditSuperhero, { action } from '../components/edit'
import CreateSuperhero, { action as cretaeAction } from '../components/create'
import { action as deleteAction } from '../action/delete'
import Start from '../components/start'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        loader: superheroesLoader,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Start />,
                        
                    },
                    {
                        path: 'superheroes/:superheroId',
                        element: <Superhero />
                    },
                    {
                        path: "superheroes/create",
                        element: <CreateSuperhero />,
                        action: cretaeAction
                    },
                    {
                        path: "superheroes/:superheroId/edit",
                        element: <EditSuperhero />,
                        action: action
                    },
                    {
                        path: "superheroes/:superheroId/delete",
                        action: deleteAction
                    }
                ]
            }
        ]
    }
], {
    future: {
        v7_fetcherPersist: true,
    },
});

export default router;