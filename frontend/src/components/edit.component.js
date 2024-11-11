import { Form } from "react-router-dom";
import { deleteImage } from "../services/api.service";
import { avatarUrl } from "./superhero";
import { useSuperheroes } from "../context/superheroes";

export default function EditComponent({ superhero }) {
    const { deleteImgSuperhero } = useSuperheroes();

    function deleteImageBtn(imageName) {
        deleteImage(superhero._id, imageName);
        deleteImgSuperhero(superhero._id, imageName);
    }

    return <>
        <Form method="post" className="CreateSuperhero" encType="multipart/form-data" id="edit">
            <span>Nickname</span>
            <input
                placeholder="Nickname"
                type="text"
                name="nickname"
                defaultValue={superhero?.nickname}
            />
            <span>Real name</span>
            <input
                placeholder="Real name"
                type="text"
                name="real_name"
                defaultValue={superhero?.real_name}
            />
            <span>Origin description</span>
            <textarea
                placeholder="Origin description"
                type="text"
                name="origin_description"
                defaultValue={superhero?.origin_description}
            />
            <span>Superpowers</span>
            <input
                placeholder="Superpowers"
                type="text"
                name="superpowers"
                defaultValue={superhero?.superpowers}
            />
            <span>Catch phrase</span>
            <input
                placeholder="Catch phrase"
                type="text"
                name="catch_phrase"
                defaultValue={superhero?.catch_phrase}
            />
            <span>Image</span>
            <input
                placeholder="https://example.com/avatar.jpg"
                aria-label="Images URL"
                type="file"
                name="images[]"
                multiple
                accept="image/jpeg,image/jpg"
            />
            {
                superhero?.Images.map(imgUrl => <div>
                    <img key={imgUrl} src={avatarUrl(imgUrl)} />
                    <button type="button" onClick={() => deleteImageBtn(imgUrl)}>Delete Image</button>
                </div>)
            }
            <button type="submit">Save</button>
        </Form>
    </>
}