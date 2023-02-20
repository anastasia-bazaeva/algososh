export const swap = (arr: any[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
}

export const delay = (delay: number) => {
    return new Promise<ReturnType<typeof setTimeout>>((resolve) => {
        setTimeout(resolve, delay)
    })
}