export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("pl-PL", {
		style: "currency",
		currency: "PLN",
	}).format(amount);
};
