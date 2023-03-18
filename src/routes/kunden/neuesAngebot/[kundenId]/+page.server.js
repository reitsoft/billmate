import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";

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
