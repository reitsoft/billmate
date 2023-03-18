import { prisma } from "$lib/server/prisma";

export const load = async () => {
	return {
		kunden: await prisma.kunde.findMany({
			orderBy: {
				createdAt: "desc"
			}
		})
	};
};
