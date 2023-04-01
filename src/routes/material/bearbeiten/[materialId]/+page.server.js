import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import materialSchema from "$lib/validation/materialSchema";

export const load = async (event) => {
	let form = await superValidate(event, materialSchema);
	const get = async () => {
		const material = await prisma.material.findUnique({ where: { id: Number(event.params.materialId) } });

		if (!material) {
			return fail(404, "Material nicht gefunden.");
		}

		return { material };
	};
	const { material } = await get();
	form.data = material;
	return { 
		form,
		einheiten: await prisma.einheiten.findMany({})
	};
};

export const actions = {
	updateMaterial: async (event) => {
		const form = await superValidate(event, materialSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.material.update({
				where: { id: Number(event.params.materialId) },
				data: form.data
			});
		} catch (error) {
			console.log(error);
			return message(form, "Material konnte nicht aktualisiert werden.", { message: 500});
		}

		throw redirect(303, "/material");
	}
};
