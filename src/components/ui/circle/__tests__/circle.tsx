import renderer from 'react-test-renderer';
import { ElementStates } from '../../../../types/element-states';
import { Circle } from '../circle';

const textForCircle = 'A1';
const numberForCircle = 1;
const colors = [
    ElementStates.Default,
    ElementStates.Changing,
    ElementStates.Modified
]

describe('test circle component', () =>{
    it('check render circle with letter', ()=>{
        const tree = renderer.create(<Circle letter={textForCircle}/>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render circle without letter', ()=>{
        const tree = renderer.create(<Circle />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render circle with head', ()=>{
        const tree = renderer.create(<Circle head={textForCircle} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render circle with tail', ()=>{
        const tree = renderer.create(<Circle tail={textForCircle} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render circle with node in head', ()=>{
        const tree = renderer.create(<Circle head={<Circle/>} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render circle with node in tail', ()=>{
        const tree = renderer.create(<Circle tail={<Circle/>} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render circle with index', ()=>{
        const tree = renderer.create(<Circle index={numberForCircle} />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render small circle', ()=>{
        const tree = renderer.create(<Circle isSmall={true}/>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    colors.forEach((color => {
        it('check render with color', ()=>{
            const tree = renderer.create(<Circle state={color}/>).toJSON()

            expect(tree).toMatchSnapshot()
        })
    }))
})