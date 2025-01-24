export const getFilterOptions = (data, target) => {
	const filterOptions = [];
	// Add safety check for undefined data
	if (!data) return [];

	// take the data and return each value for the target key
	data.map((item) => filterOptions.push(...item[target]));

	// remove any duplicate values and alphabetize the list
	const uniqueFilterOptions = [...new Set(filterOptions)].sort();

	// return the unique list
	return uniqueFilterOptions;
};
