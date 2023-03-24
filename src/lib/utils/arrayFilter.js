export default function (arr, searchTerm) {
	return arr.filter((item) =>
		Object.keys(item).some(
			(key) => typeof item[key] === "string" && item[key].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		)
	);
}
