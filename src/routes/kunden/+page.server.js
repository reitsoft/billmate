import { prisma } from "$lib/server/prisma";

export const load = async () => {
	return {
		kunden: await prisma.kunden.findMany({
			where: { geloescht: false },
			orderBy: { createdAt: "desc" }
		})
	};
};
