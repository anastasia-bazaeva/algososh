import React, { SyntheticEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import StringStyles from '../string/string.module.css';
import { useForm, Tvaluesnumbers } from "../../hooks/useForm";
import { delay, fibonacci } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import FiboStyles from './fibonacci.module.css';


export const FibonacciPage: React.FC = () => {
  const {values, handleChange, setValues } = useForm<Tvaluesnumbers>({fiboNumber: 0});
  const [isLoader, setLoader] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<Array<number>>([]);

  const onSubmit = async(e: SyntheticEvent) => {
    e.preventDefault();
    await getCircles(values.fiboNumber);
    setValues({fiboNumber: 0});
  }

  const getCircles = async(n: number) => {
    setLoader(true);
    const arr = fibonacci(n);
    for(let i = 0; i < arr.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setNumbers(arr.slice(0, i + 1));
    }
    setLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={StringStyles.inputZone} onSubmit={onSubmit}>
          <Input
          name="fiboNumber"
          placeholder="Введите число"
          type="number"
          max={19}
          isLimitText={true}
          onChange={handleChange}
          value={((values.fiboNumber > 0)&&(values.fiboNumber < 20)) ? values.fiboNumber : ''}
          disabled={isLoader}/>
          <Button
          text="Рассчитать"
          type="submit"
          isLoader={isLoader}
          disabled={!values.fiboNumber}
          />
        </form>
        <ul className={FiboStyles.fibCircles}>
          {numbers?.map((item, index) => {
            return (<li key={index}>
                      <Circle letter={`${item}`} index={index}/>
                   </li>)
          })}
        </ul>
    </SolutionLayout>
  );
};
