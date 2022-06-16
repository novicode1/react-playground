import { /* utcToZonedTime,*/ format } from 'date-fns-tz';
import tzParseTimezone from 'date-fns-tz/_lib/tzParseTimezone';
import {
	isPast,
	startOfDay,
	subWeeks,
	toDate as fnsToDate,
	parseISO,
	differenceInMilliseconds as fnsDifferenceInMilliseconds,
	addMilliseconds,
	subMilliseconds,
	getTime,
	subHours,
	isWithinInterval,
	isBefore,
	isAfter,
	isEqual,
	max,
	min
} from 'date-fns';

import localization from '../stores/localization.store';

export function toDate (value) {
	switch (typeof value) {
		case 'string': return parseISO(value);
		case 'number': return fnsToDate(value);
		case 'object': return new Date(value);
		default: return new Date();
	}
}

// fixed version of 'date-fns-tz/utcToZonedTime'
// TODO: Remove this implementation when it will be merged in upstream https://github.com/marnusw/date-fns-tz/pull/51
function utcToZonedTime (dirtyDate, tz) {
	let date = toDate(dirtyDate);

	// We just need to apply the offset indicated by the time zone to this localized date
	let offsetMilliseconds = tzParseTimezone(tz, date);
	let zonedDate = offsetMilliseconds ? subMilliseconds(date, offsetMilliseconds) : date;

	// This date has the UTC time values of the zoned date at the system time zone
	return new Date(
		zonedDate.getUTCFullYear(),
		zonedDate.getUTCMonth(),
		zonedDate.getUTCDate(),
		zonedDate.getUTCHours(),
		zonedDate.getUTCMinutes(),
		zonedDate.getUTCSeconds(),
		zonedDate.getUTCMilliseconds()
	 );
}

export function formatDate (time, { template, locale, timeZone } = {}) {
	// eslint-disable-next-line no-param-reassign
	timeZone = timeZone || new Intl.DateTimeFormat().resolvedOptions().timeZone;
	let date = utcToZonedTime(time, timeZone);

	return format(date, template, { locale: localization.getLocalization(locale), timeZone });
}

export function wasLastWeek (date) {
	let now = new Date();
	let dayHasPast = isPast(date);
	let oneWeekBefore = subWeeks(now, 1);
	let dayWasLastWeek = dayHasPast && isAfter(date, startOfDay(oneWeekBefore));

	return dayWasLastWeek;
}

export function differenceInMilliseconds (dateEnd, dateStart) {
	return fnsDifferenceInMilliseconds(dateEnd, dateStart);
}

export function subtractMilliseconds (date, ms) {
	return subMilliseconds(date, ms);
}

export function nextIntervalDate (time, interval) {
	let date = toDate(time);
	let millisecondsPassed = getTime(date) % interval;
	let millisecondsLeft = millisecondsPassed ? interval - millisecondsPassed : 0;
	let nextDate = addMilliseconds(date, millisecondsLeft);

	return nextDate;
}

export function previousIntervalDate (time, interval) {
	let date = toDate(time);
	let millisecondsPassed = getTime(date) % interval;
	let prevDate = subMilliseconds(date, millisecondsPassed);

	return prevDate;
}

export function isDSTSwitchHour (time, { timeZone } = {}) {
	// eslint-disable-next-line no-param-reassign
	timeZone = timeZone || new Intl.DateTimeFormat().resolvedOptions().timeZone;
	let date = toDate(time);
	let zonedDate = utcToZonedTime(date, timeZone);
	let zonedOneHourBefore = utcToZonedTime(subHours(date, 1), timeZone);
	let hours = zonedDate.getHours();
	let hoursBefore = zonedOneHourBefore.getHours();
	let hoursOverlap = hours === hoursBefore;

	return hoursOverlap;
}

export function nowDate () {
	return new Date();
}

export {
	addMilliseconds,
	isWithinInterval,
	isBefore,
	isAfter,
	isEqual,
	max,
	min
};