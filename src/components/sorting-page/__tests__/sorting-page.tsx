import { Direction } from "../../../types/direction";
import { ElementStates } from "../../../types/element-states"
import { bubbleSort, selectionSort } from "../../../utils/utils";

describe('check if sorting algorithms works right', () =>{
    let normalArr = [
        { value: 5, color: ElementStates.Default },
        { value: 11, color: ElementStates.Default },
        { value: 28, color: ElementStates.Default },
        { value: 164, color: ElementStates.Default },
        { value: 0, color: ElementStates.Default },
    ];
    let emptyArr: [] = [];
    let singleElArr = [{ value: 28, color: ElementStates.Default }];

    it('selection sort sorts correctly full array ascending', ()=>{
        expect(selectionSort(normalArr, Direction.Ascending).toString()).toBe(([
            { value: 0, color: ElementStates.Default },
            { value: 5, color: ElementStates.Default },
            { value: 11, color: ElementStates.Default },
            { value: 28, color: ElementStates.Default },
            { value: 164, color: ElementStates.Default },
        ]).toString())
    })

    it('selection sort sorts correctly full array descending', ()=>{
        expect(selectionSort(normalArr, Direction.Descending).toString()).toBe(([
            { value: 164, color: ElementStates.Default },
            { value: 28, color: ElementStates.Default },
            { value: 11, color: ElementStates.Default },
            { value: 5, color: ElementStates.Default },
            { value: 0, color: ElementStates.Default },
        ]).toString())
    })

    it('selection sort sorts correctly empty array ascending', ()=>{
        expect(selectionSort(emptyArr, Direction.Ascending).toString()).toBe(([]).toString())
    })

    it('selection sort sorts correctly empty array descending', ()=>{
        expect(selectionSort(emptyArr, Direction.Descending).toString()).toBe(([]).toString())
    })

    it('selection sort sorts correctly one-item array ascending', ()=>{
        expect(selectionSort(singleElArr, Direction.Ascending).toString()).toBe(([{ 
            value: 28, color: ElementStates.Default }]).toString())
    })

    it('selection sort sorts correctly one-item array descending', ()=>{
        expect(selectionSort(singleElArr, Direction.Descending).toString()).toBe(([{ 
            value: 28, color: ElementStates.Default }]).toString())
    })

    it('bubble sort sorts correctly full array descending', ()=>{
        expect(bubbleSort(normalArr, Direction.Descending).toString()).toBe(([
            { value: 164, color: ElementStates.Default },
            { value: 28, color: ElementStates.Default },
            { value: 11, color: ElementStates.Default },
            { value: 5, color: ElementStates.Default },
            { value: 0, color: ElementStates.Default },
        ]).toString())
    })

    it('bubble sort sorts correctly empty array ascending', ()=>{
        expect(bubbleSort(emptyArr, Direction.Ascending).toString()).toBe(([]).toString())
    })

    it('bubble sort sorts correctly empty array descending', ()=>{
        expect(bubbleSort(emptyArr, Direction.Descending).toString()).toBe(([]).toString())
    })

    it('bubble sort sorts correctly one-item array ascending', ()=>{
        expect(bubbleSort(singleElArr, Direction.Ascending).toString()).toBe(([{ 
            value: 28, color: ElementStates.Default }]).toString())
    })

    it('bubble sort sorts correctly one-item array descending', ()=>{
        expect(bubbleSort(singleElArr, Direction.Descending).toString()).toBe(([{ 
            value: 28, color: ElementStates.Default }]).toString())
    })
})