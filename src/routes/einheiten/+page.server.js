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
	},
	deleteEinheit: async ({ url }) => {
		const id = url.searchParams.get("id");

		if(!id) {
			return fail(404, { message: "Einheit nicht gefunden." });
		}
		try {
			await prisma.einheiten.delete({where:{ id: Number(id) }})
		} catch (error) {
			console.error(error)
			return fail(500, { message: "Etwas ist schief gelaufen." });
		}
		return{
			status: 200
		}
	}
};
