import { useActionData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createSuperhero } from "../services/api.service";
import { useSuperheroes } from "../context/superheroes";
import { useEffect } from "react";
import EditComponent from "./edit.component";

export async function action({ request, params }) {
    const superhero = await request.formData();

    const superheroImages = new FormData();
    const images = superhero.getAll("images[]");
    for (let i = 0; i < images.length; i++) {
        superheroImages.append('images[]', images[i]);
    }
    superhero.delete('images[]');

    return await createSuperhero(superhero, superheroImages);
}

export default function CreateSuperhero(params) {
    const { addSuperhero } = useSuperheroes();
    const createdSuperhero = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (createdSuperhero) {
            addSuperhero(createdSuperhero);
            navigate(`/superheroes/${createdSuperhero._id}`);
        }
    }, [createdSuperhero])


    return <>
        <EditComponent />
    </>
}