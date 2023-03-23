import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import kundeSchema from "$lib/validation/kundeSchema";

export const load = async (event) => {
	let form = await superValidate(event, kundeSchema);
	const getKunde = async () => {
		const kunde = await prisma.kunden.findUnique({ where: { id: Number(event.params.kundenId) } });

		if (!kunde) {
			throw fail(404, "Kunde nicht gefunden.");
		}
		return { kunde };
	};
	const { kunde } = await getKunde();
	form.data = kunde;
	return { form };
};

export const actions = {
	updateKunde: async (event) => {
		const form = await superValidate(event, kundeSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.kunden.update({
				where: { id: Number(event.params.kundenId) },
				data: form.data
			});
		} catch (error) {
			console.log(error);
			return fail(500, "Kundendaten konnten nicht aktualisiert werden.");
		}

		throw redirect(303, "/kunden");
	}
};
