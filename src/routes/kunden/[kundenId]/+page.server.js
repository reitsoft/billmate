import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export const load = async ({ params }) => {
	const getKunde = async () => {
		const kunde = await prisma.kunde.findUnique({ where: { id: params.kundenId } });
		if (!kunde) {
			throw error(404, "Kunde nicht gefunden.");
		}
		return kunde;
	};
	return {
		kunde: getKunde()
	};
};

export const actions = {
	updateKunde: async ({ request, params }) => {
		const { firma, anrede, vorname, nachname, adresse, ort, mobil, email } = Object.fromEntries(
			await request.formData()
		);

		try {
			await prisma.kunde.update({
				where: { id: params.kundenId },
				data: {
					firma,
					anrede,
					vorname,
					nachname,
					adresse,
					ort,
					mobil,
					email
				}
			});
		} catch (error) {
			console.log(error);
			return fail(500, "Kundendaten konnten nicht aktualisiert werden.");
		}
	}
};
