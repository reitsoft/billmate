import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import einheitSchema from "$lib/validation/einheitSchema";

export const load = async (event) => {
	let form = await superValidate(event, einheitSchema);
	const getEinheit = async () => {
		const einheit = await prisma.einheiten.findUnique({ where: { id: Number(event.params.einheitId) } });

		if (!einheit) {
			return fail(404, "Einheit nicht gefunden.");
		}

		return {
			einheit
		};
	};
	const { einheit } = await getEinheit();
	form.data = einheit;
	return { form };
};

export const actions = {
	updateEinheit: async (event) => {
		const form = await superValidate(event, einheitSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.einheiten.update({
				where: { id: Number(event.params.einheitId) },
				data: form.data
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: "Einheit konnte nicht erstellt werden." });
		}

		throw redirect(303, "/einheiten");

		// const { firma, anrede, vorname, nachname, adresse, ort, mobil, email } = Object.fromEntries(
		// 	await request.formData()
		// );

		// try {
		// 	await prisma.kunden.update({
		// 		where: { id: Number(params.kundenId) },
		// 		data: {
		// 			firma,
		// 			anrede,
		// 			vorname,
		// 			nachname,
		// 			adresse,
		// 			ort,
		// 			mobil,
		// 			email
		// 		}
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// 	return fail(500, "Kundendaten konnten nicht aktualisiert werden.");
		// }
		// throw redirect(303, "/kunden");
	}
};
