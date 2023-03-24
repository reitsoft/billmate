import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async () => {
	return {
		dienstleistungen: await prisma.dienstleistungen.findMany({})
	};
};

export const actions = {
	deleteDienstleistung: async ({ url }) => {
		const id = url.searchParams.get("id");

		if (!id) {
			return fail(404, { message: "Dienstleistung nicht gefunden." });
		}

		try {
			await prisma.dienstleistungen.delete({ where: { id: Number(id) } });
		} catch (error) {
			console.error(error);
			return fail(500, { message: "Etwas ist schief gelaufen." });
		}
		return {
			status: 200
		};
	}
};
