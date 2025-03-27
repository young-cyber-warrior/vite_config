function calculate(items: number[]) {
    return items.reduce<number>((acc, item) => acc + item, 0);
}

function multiply(items: number[]) {
    return items.reduce<number>((acc, item) => acc * item, 1);
}

export const mathOperations = {
    calculate,
    multiply,
};
