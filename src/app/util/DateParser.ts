function toDayMonthYear(date: string): string {
	return (new Date(date)).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
}

function toTime(date: string): string {
	return (new Date(date)).toLocaleTimeString('en-GB', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: false,
	});
}

const DateParser = {
	toDayMonthYear,
	toTime,
};

export default DateParser;
