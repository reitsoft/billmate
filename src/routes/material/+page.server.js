import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async () => {
	return {
		material: await prisma.material.findMany({})
	};
};

export const actions = {
	deleteMaterial: async ({ url }) => {
		const id = url.searchParams.get("id");

		if (!id) {
			return fail(404, { message: "Material nicht gefunden." });
		}

		try {
			await prisma.material.delete({ where: { id: Number(id) } });
		} catch (error) {
			console.error(error);
			return fail(500, { message: "Etwas ist schief gelaufen." });
		}
		return {
			status: 200
		};
	}
};
