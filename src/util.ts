import { TodoItem } from "./components/Form";

export function taskCompletedComparator(a: TodoItem, b: TodoItem): number {
    const x = a.completed;
    const y = b.completed;
    if (x === y) {
        return 0;
    }
    if (x !== y && x === true) {
        return 1;
    }
    return -1;
}

export function taskDateComparator(a: TodoItem, b: TodoItem): number {
    return a.dueDate > b.dueDate ? 1 : -1;
}

export function getUniqueFromArray(arr: string[]) {
    var seen: Set<string> = new Set();
    return arr.filter((item) => {
        if (seen.has(item)) {
            return false;
        } 
        seen.add(item);
        return true;
    });
}

export function dateToString(date: Date) {
    const monthMap = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    return monthMap[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}