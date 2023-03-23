import { reverseStringCounter } from "../../../utils/utils";


describe('check correct work of string reverse', ()=>{
    const evenString = 'HERMIONE';
    const oddString = 'HARRY';
    const emptyString = '';
    const oneCharString = 'S';

    it('works correctly with even number of chars', ()=>{
        
        expect(reverseStringCounter(evenString)).toBe(4)

    })

    it('works correctly with odd number of chars', ()=>{
        
        expect(reverseStringCounter(oddString)).toBe(2)

    })

    it('works correctly with a string with one char', ()=>{
        
        expect(reverseStringCounter(oneCharString)).toBe(0)

    })

    it('works correctly with an empty string', ()=>{
        
        expect(reverseStringCounter(emptyString)).toBe(0)

    })
})