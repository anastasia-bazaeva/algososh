import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from '../button';

const buttonText = 'Click me';
const clickedAlert = 'I was clicked'
const mockClick = () => alert(clickedAlert);

describe('test Button component', () => {
    it('check render button with text', () => {
        const tree = renderer.create(<Button text={buttonText}/>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render button without text', () => {
        const tree = renderer.create(<Button />).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render button with loader', () => {
        const tree = renderer.create(<Button isLoader={true}/>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check render disabled button', () => {
        const tree = renderer.create(<Button disabled={true}/>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('check if button can be successfully clicked', () => {
        window.alert = jest.fn();
        render(<Button text={buttonText} onClick={mockClick}/>)

        const link = screen.getByText(buttonText);

        fireEvent.click(link);

        expect(window.alert).toHaveBeenCalledWith(clickedAlert);
    })

})