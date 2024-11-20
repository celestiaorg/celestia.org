export function formatDateRange(startDate, endDate) {
	// Handle text-based dates (e.g., "Upcoming", "TBD")
	if (!startDate.includes("-")) {
		return startDate;
	}

	const start = new Date(startDate);
	const end = endDate ? new Date(endDate) : null;

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	if (!end) {
		return `${monthNames[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`;
	}

	if (start.getTime() === end.getTime()) {
		return `${monthNames[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`;
	}

	if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
		return `${monthNames[start.getMonth()]} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
	}

	if (start.getFullYear() === end.getFullYear()) {
		return `${monthNames[start.getMonth()]} ${start.getDate()} - ${monthNames[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
	}

	return `${monthNames[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()} - ${
		monthNames[end.getMonth()]
	} ${end.getDate()}, ${end.getFullYear()}`;
}
