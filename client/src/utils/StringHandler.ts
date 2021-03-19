export const cutString = (str: string, size: number) : string => {
    return str.slice(0,size) + "...";
}