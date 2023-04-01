import { prisma } from "$lib/server/prisma";

export const load = async () => {
	return {
		angebote: await prisma.angebote.findMany({
			where: { geloescht: false },
			orderBy: { createdAt: "desc" },
      include: { Kunden: true}
		})
	};
};
