import { useActionData, useNavigate, useParams } from "react-router-dom";
import { useSuperheroes } from "../context/superheroes";
import EditComponent from "./edit.component";
import { updateSuperhero } from "../services/api.service";
import { useEffect } from "react";

export async function action({ request, params }) {
    const superhero = await request.formData();

    const superheroImages = new FormData();
    const images = superhero.getAll("images[]");
    for (let i = 0; i < images.length; i++) {
        superheroImages.append('images[]', images[i]);
    }
    superhero.delete('images[]');

    return await updateSuperhero(params.superheroId, superhero, superheroImages);
}

export default function EditSuperhero() {
    const { superheroId } = useParams();
    const { value: superheroes, updateSuperhero } = useSuperheroes();
    const updatedSuperhero = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (updatedSuperhero) {
            updateSuperhero(updatedSuperhero);
            navigate(`/superheroes/${updatedSuperhero._id}`);
        }
    }, [updatedSuperhero])


    const superhero = superheroes.find(v => v._id === superheroId);

    return superhero && <EditComponent superhero={superhero} />
}