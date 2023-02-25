import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Tvaluesnumbers, TvaluesStrings, useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { StackQueuePanel } from "../stack-queue-panel/stack-queue-panel";
import { Letter } from "../string/string";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import PanelStyle from '../stack-queue-panel/stack-queue-panel.module.css';

export const StackPage: React.FC = () => {
  const {values, handleChange, setValues } = useForm<TvaluesStrings>({item: ''});
  const [isLoader, setLoader] = useState(false);
  const [itemsArr, setItemsArr] = useState<Array<Letter>>([]);
  const [stack] = useState(new Stack<Letter>());

  const reset = () => {
    stack.clear();
    setItemsArr([...stack.getArray()])
  }

  const add = async() => {
    setLoader(true);
    if(values.item !== '') {
      stack.push({
        value: values.item,
        color: ElementStates.Changing
      });
      setItemsArr([...stack.getArray()]);
      setValues({item: ''});
      await delay(SHORT_DELAY_IN_MS);
      stack.peak()!.color = ElementStates.Default
    }
    console.log(itemsArr);
    setLoader(false);
  }
  
  const remove = async() => {
    setLoader(true);
    if(stack.getArray()) {
      stack.peak()!.color = ElementStates.Changing
      await delay(SHORT_DELAY_IN_MS);
      stack.pop();
      setItemsArr([...stack.getArray()]);
    }
    setLoader(false);
  }

  return (
    <SolutionLayout title="Стек">
      <StackQueuePanel 
      values={values} 
      handleChange={handleChange} 
      setValues={setValues} 
      isLoader={isLoader} 
      add={add} 
      reset={reset}
      remove={remove}/>
      <ul className={PanelStyle.itemList}>
        {itemsArr?.map((item, index)=> {
          return(<li key={index}>
            <Circle letter={item.value} index={index} state={item.color} head={index === stack.getSize() - 1 ? "top" : ''}/>
          </li>
          )
        })
      }
      </ul>
    </SolutionLayout>
  );
};
