export const saveToLocalStorage = ({
	key,
	value,
}: {
	key: string;
	value: string;
}) => {
	localStorage.setItem(key, value);
};
export const getFromLocalStorage = (key: string) => {
	return localStorage.getItem(key) || undefined;
};
