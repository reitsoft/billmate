import { prisma } from "$lib/server/prisma";

Date.prototype.getWeek = function () {
	var dt = new Date(this.getFullYear(), 0, 1);
	return Math.ceil(((this - dt) / 86400000 + dt.getDay() + 1) / 7)
		.toString()
		.slice(-2);
};

export default async () => {
	const aktuellesJahr = new Date().getFullYear().toString().slice(-2);
	const aktuelleWoche = new Date().getWeek();
	let result = await prisma.angebote.findMany({ take: -1 });
	let neueLaufendeNummer = "001";
	if (result.length > 0) {
		const letzteNummer = result[0].nummer;
		const letzteNummerWoche = letzteNummer.slice(2, 4);
		if (letzteNummerWoche === aktuelleWoche) {
			neueLaufendeNummer = ("000" + (Number(letzteNummer.slice(-3)) + 1).toString()).slice(-3);
		}
	}
	return aktuellesJahr + aktuelleWoche + neueLaufendeNummer;
};
