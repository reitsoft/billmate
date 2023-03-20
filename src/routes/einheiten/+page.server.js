import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async () => {
	return {
		einheiten: await prisma.einheiten.findMany({})
	};
};

export const actions = {
	createEinheit: async ({ request }) => {
		const { bezeichnung, abkuerzung } = Object.fromEntries(await request.formData());

		try {
			await prisma.einheiten.create({
				data: {
					bezeichnung,
					abkuerzung
				}
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: "Einheit konnte nicht erstellt werden." });
		}
		return {
			status: 201
		};
	}
};
