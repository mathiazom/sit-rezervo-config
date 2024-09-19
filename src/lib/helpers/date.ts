import { DateTime, Info, Settings } from "luxon";

import { ExcludeClassTimeFilter, RezervoClass } from "@/types/chain";

export const compactISOWeekString = (date: DateTime): string | null =>
    date.toISOWeekDate()?.replace("-", "").slice(0, 7) ?? null;

export const fromCompactISOWeekString = (weekString: string): DateTime | null =>
    LocalizedDateTime.fromObject({
        weekYear: Number.parseInt(weekString.slice(0, 4)),
        weekNumber: Number.parseInt(weekString.slice(5, 7)),
    });

export const calculateMondayOffset = () => LocalizedDateTime.now().weekday - 1;

export const zeroIndexedWeekday = (oneIndexedWeekday: number): number => (oneIndexedWeekday + 6) % 7;

export const capitalizeFirstCharacter = (text: string) => {
    return `${text[0]!.toUpperCase()}${text.slice(1)}`;
};

export const getCapitalizedWeekday = (date: DateTime): string => {
    if (!date.isValid || date.weekdayLong === null) {
        throw new Error("Invalid date");
    }

    return capitalizeFirstCharacter(date.weekdayLong);
};

export const getCapitalizedWeekdays = (): string[] => {
    return Info.weekdays("long").map((weekday) => capitalizeFirstCharacter(weekday));
};

export function isClassInThePast(_class: RezervoClass): boolean {
    return _class.startTime < LocalizedDateTime.now();
}

export function sameDay(a: DateTime, b: DateTime): boolean {
    return a.startOf("day") <= b && b <= a.endOf("day");
}

export function isToday(date: DateTime) {
    return sameDay(date, LocalizedDateTime.now());
}

export function isDayPassed(date: DateTime) {
    return date.endOf("day") > LocalizedDateTime.now();
}

export function firstDateOfWeekByOffset(weekOffset: number): DateTime {
    return LocalizedDateTime.now()
        .startOf("day")
        .plus({ day: weekOffset * 7 - calculateMondayOffset() });
}

export const LocalizedDateTime: typeof DateTime = (() => {
    Settings.defaultLocale = "no";
    Settings.defaultZone = "Europe/Oslo";
    return DateTime;
})();

export const isClassExcludedByTimeFilter = (
    _class: RezervoClass,
    excludeClassTimeFilter: ExcludeClassTimeFilter,
): boolean => {
    if (
        _class.startTime.weekday !== excludeClassTimeFilter.weekday &&
        _class.endTime.weekday !== excludeClassTimeFilter.weekday
    ) {
        return false;
    }

    // Include a check for the middle value, in case of entirely overlapping exclude-filter
    const middle = _class.startTime.plus(_class.endTime.minus(_class.startTime.toMillis()).toMillis() / 2);
    return [_class.startTime, _class.endTime, middle].some((candidateTime) => {
        const startTime = candidateTime.set({
            hour: excludeClassTimeFilter.startHour,
            minute: excludeClassTimeFilter.startMinute,
        });
        const endTime = candidateTime.set({
            hour: excludeClassTimeFilter.endHour,
            minute: excludeClassTimeFilter.endMinute,
        });

        return candidateTime > startTime && candidateTime < endTime;
    });
};
