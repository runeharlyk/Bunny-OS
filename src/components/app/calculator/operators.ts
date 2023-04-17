export type operator = {
    key:string,
    action: action,
    triggers?:string[]
}

export type action = (result: string, key: string) => string

export type historyEntry = {
    operation: string,
    result: string,
}

export const history:historyEntry[] = []

export const append = (a: string, b: string): string => { return format(b += a) }

export const interpolation = (a: string, b: string): string => { return a.replace("x", b) }

export const clear = (a:string, b:string):string => { return ""}

export const backspace = (a:string, b:string):string => { return b.slice(0,-1) }

export const percentage = (a:string, b:string):string => { return ((+eval(b))/100).toString() }

export const calculate = (a: string, b: string): string => { 
    let result = b.replaceAll('x', '*').replaceAll(',', '.');
    let historyEntry: historyEntry = {operation:b,result:eval(result)}
    history.push(historyEntry);
    return historyEntry.result;
}

export const format = (str:string):string => {
    return str.replaceAll('*', 'x').replaceAll('.', ',')
}