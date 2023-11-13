type ClassName = undefined | null | false | string;

const cn = (...args: ClassName[]): string =>
    args.filter((arg) => arg).join(" ");

export default cn;
