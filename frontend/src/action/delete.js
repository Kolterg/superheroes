import { redirect } from "react-router-dom";
import { deleteSuperhero } from "../services/api.service";

export async function action({ params }) {
    await deleteSuperhero(params.superheroId);
    return redirect("/");
}