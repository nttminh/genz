export const formatCurrency = (
	price: number | string | undefined | null
): string => {
	if (!price) {
		return '';
	}

	return price.toLocaleString('it-IT', {
		style: 'currency',
		currency: 'VND',
	});
};
