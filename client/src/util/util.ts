export function getDate(delimiter = "/") {
    const leftPad = (value: number) => {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;
    };

    const date = new Date();
    const year = date.getFullYear();
    const month = leftPad(date.getMonth() + 1);
    const day = leftPad(date.getDate());
    const hour = leftPad(date.getHours());
    const minites = leftPad(date.getMinutes());
    const seconds = leftPad(date.getSeconds());
    const yyyymmdd = [year, month, day].join(delimiter);
    const hhmmss = [hour, minites, seconds].join(":");
    

    return yyyymmdd + " " + hhmmss;
}