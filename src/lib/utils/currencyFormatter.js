const formatter = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export const formatCurrency = (value) => formatter.format(value);