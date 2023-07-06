export const dateFormat = (date: string) => {
	const deleteTimestamp = date?.split('T')[0];
	const day = deleteTimestamp.split('-')[2];
	const month = deleteTimestamp.split('-')[1];
	const year = deleteTimestamp.split('-')[0];

	return `${day}/${month}/${year}`;
};
