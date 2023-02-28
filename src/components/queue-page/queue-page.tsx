import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TvaluesStrings, useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { StackQueuePanel } from "../stack-queue-panel/stack-queue-panel";
import { Letter } from "../string/string";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import PanelStyle from '../stack-queue-panel/stack-queue-panel.module.css';
import { Circle } from "../ui/circle/circle";
import { ButtonNames } from "../../types/buttons";

export const QueuePage: React.FC = () => {
  const {values, handleChange, setValues } = useForm<TvaluesStrings>({item: ''});
  const [isLoader, setLoader] = useState(false);
  const [itemsArr, setItemsArr] = useState<Array<Letter>>(Array(7));
  const [queue] = useState(new Queue<Letter>(7));
  const [activeButton, setButton] = useState<string>('')

  const add = async() => {
    setLoader(true);
    setButton(ButtonNames.Add);
    if(values.item !== '') {
      queue.enqueue({
        value: values.item,
        color: ElementStates.Changing
      });
      setItemsArr([...queue.getArray()]);
      setValues({item: ''});
      await delay(SHORT_DELAY_IN_MS);
      queue.getArray()[queue.tail - 1] = {value: values.item, color: ElementStates.Default};
      setItemsArr([...queue.getArray()]);
      console.log(itemsArr)
    }
    setButton('');
    setLoader(false)
  }

  const remove = async() => {
    setLoader(true);
    setButton(ButtonNames.Remove);
    if (!queue.isEmpty()) {
      itemsArr[queue.head] = {value: values.item, color: ElementStates.Changing};
      await delay(SHORT_DELAY_IN_MS);
      queue.getArray()[queue.head - 1] = {value: '', color: ElementStates.Default};
      queue.dequeue();
      setItemsArr([...queue.getArray()]);
    }
    setButton('');
    setLoader(false);
  }

  const reset = () => {
    setLoader(true);
    setButton(ButtonNames.Clear);
    queue.clear();
    setItemsArr([...queue.getArray()]);
    setButton('');
    setValues({item: ''})
    setLoader(false);
  }

  useEffect(()=>{
    setItemsArr([...queue.getArray()]);
  },[])

  return (
    <SolutionLayout title="Очередь">
      <StackQueuePanel
      values={values}
      handleChange={handleChange}
      setValues={setValues}
      isLoader={isLoader}
      add={add}
      remove={remove}
      reset={reset}
      isEmpty={queue.isEmpty()}
      activeButton={activeButton}
      />
      <ul className={PanelStyle.itemList}>
        {itemsArr?.map((item, index)=> {
          return(<li key={index}>
            <Circle letter={item ? item.value : ''} 
            index={index} 
            state={item ? item.color : ElementStates.Default}
            head={!queue.isEmpty() && index === queue.head ? 'head' : ''}
            tail={!queue.isEmpty() && index === (queue.tail - 1) ? 'tail' : ''}/>
          </li>
          )
        })
      }
      </ul>
    </SolutionLayout>
  );
};
