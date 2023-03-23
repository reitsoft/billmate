import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load = async () => {
	return {
		kunden: await prisma.kunden.findMany({
			where: { geloescht: false },
			orderBy: { createdAt: "desc" }
		})
	};
};
