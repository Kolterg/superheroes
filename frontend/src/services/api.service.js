export const baseUrl = 'http://localhost:5001';


export async function getSuperheroes() {
    const superheroes = await fetch(`${baseUrl}/superhero`, { method: 'get' }).then(r => r.json());;

    return superheroes;
}

export async function getSuperhero(id) {
    const superhero = await fetch(`${baseUrl}/superhero/${id}`, { method: 'get' }).then(r => r.json());

    return superhero;
}

export async function createSuperhero(superhero, superheroImages) {
    const createdSuperhero = await fetch(`${baseUrl}/superhero`, {
        method: 'post', body: superhero
    }).then(r => r.json());

    const superheroImagesNames = await fetch(`${baseUrl}/image/${createdSuperhero._id}`, {
        method: 'put', body: superheroImages
    }).then(r => r.json());

    return { ...createdSuperhero, Images: superheroImagesNames };
}

export async function updateSuperhero(superheroId, superhero, superheroImages) {
    const createdSuperhero = await fetch(`${baseUrl}/superhero/${superheroId}`, {
        method: 'post', body: superhero
    }).then(r => r.json());

    const superheroImagesNames = await fetch(`${baseUrl}/image/${superheroId}`, {
        method: 'put', body: superheroImages
    }).then(r => r.json());

    return { ...createdSuperhero, Images: [...createdSuperhero.Images, ...superheroImagesNames] };
}

export async function deleteSuperhero(superheroId) {
    const deletedSuperhero = await fetch(`${baseUrl}/superhero/${superheroId}`, {
        method: 'delete'
    }).then(r => r.json());

    return deletedSuperhero;
}

export async function deleteImage(superheroId, imageName) {
    await fetch(`${baseUrl}/image/${superheroId}/${imageName}`, {
        method: 'delete'
    }).then(r => r.json());
}