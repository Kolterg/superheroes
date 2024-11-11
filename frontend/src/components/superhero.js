import { Form, useParams } from "react-router-dom";
import { baseUrl } from "../services/api.service";
import { useSuperheroes } from "../context/superheroes";

export const baseImgUrl = baseUrl + '/uploads/';
export const avatarUrl = (v) => baseImgUrl + v;

export default function Superhero() {
    const { value: superheroes } = useSuperheroes();
    const { superheroId } = useParams();
    const superhero = superheroes.find(v => v._id === superheroId);

    return superhero && <>
        <div id="Superhero">
            <div>Superhero: {superhero.nickname}</div>
            <div>Real Name: {superhero.real_name}</div>
            <div>Origin description: {superhero.origin_description}</div>
            <div>Superpower: {superhero.superpowers}</div>
            <div>Catch phrase: {superhero.catch_phrase}</div>
            <div>Fotos:
                {
                    superhero.Images.map(imgUrl => <img key={imgUrl} src={avatarUrl(imgUrl)} alt="Superhero"/>)
                }
            </div>
            <Form action="edit">
                <button type="submit">Edit</button>
            </Form>
            <Form
                method="post"
                action="delete"
                onSubmit={(event) => {
                    if (
                        !window.confirm(
                            "Please confirm you want to delete this record."
                        )
                    ) {
                        event.preventDefault();
                    }
                }}
            >
                <button type="submit">Delete</button>
            </Form>
        </div>
    </>
}