import React, { SyntheticEvent, useState } from "react";
import StringStyles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TvaluesStrings, useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export type Letter = {
  value: string;
  color: ElementStates;
};

export const StringComponent: React.FC = () => {
  const {values, handleChange, setValues } = useForm<TvaluesStrings>({word: ''});
  const [stringArr, setStringArr] = useState<Array<Letter>>([]);
  const [isLoader, setLoader] = useState<boolean>(false);

  const reverseString = async (string: string) => {
    const arr = string.split('').map((letter) => {
      return ({
        value: letter,
        color: ElementStates.Default
      })
    });
    setStringArr(arr);
    let start = 0;
    let end = arr.length -1;

      while (start < end) {
          arr[start].color = ElementStates.Changing;
          arr[end].color = ElementStates.Changing;
          await delay (DELAY_IN_MS); 
          swap(arr, start, end);
          arr[start].color = ElementStates.Modified;
          arr[end].color = ElementStates.Modified;
          start++;
          end--;
          arr[start].color = ElementStates.Changing;
          arr[end].color = ElementStates.Changing;
          setStringArr([...arr])
      }
        arr[start].color = ElementStates.Modified;
        arr[end].color = ElementStates.Modified;
        setStringArr([...arr])
    }

  const onSubmit = async(e: SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    await reverseString(values.word); 
    setLoader(false)
    setValues({word: ''})
  }

  return (
    <SolutionLayout title="Строка">
        <form className={StringStyles.inputZone} onSubmit={onSubmit}>
          <Input
          name="word"
          placeholder="Введите текст"
          type="text"
          maxLength={11}
          isLimitText={true}
          onChange={handleChange}
          value={values.word}
          disabled={isLoader}/>
          <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoader}
          disabled={!values.word}
          />
        </form>
      <ul className={StringStyles.circles}>
        {stringArr?.map((item, index) => {
          return(<li key={index}>
            <Circle
            letter={item.value}
            state={item.color}/>
          </li>)
        })}
      </ul>
    </SolutionLayout>
  );
};
