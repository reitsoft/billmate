import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import materialSchema from "$lib/validation/materialSchema";

export const load = async (event) => {
	return {
		form: await superValidate(event, materialSchema),
		einheiten: await prisma.einheiten.findMany({})
	};
};

export const actions = {
	createMaterial: async (event) => {
		const form = await superValidate(event, materialSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.material.create({
				data: form.data
			});
		} catch (error) {
			console.log(error);
			return message(form, "Einheit konnte nicht erstellt werden.", { status: 500 });
		}

		throw redirect(303, "/material");
	}
};
