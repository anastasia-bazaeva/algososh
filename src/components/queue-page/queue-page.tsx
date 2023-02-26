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

export const QueuePage: React.FC = () => {
  const {values, handleChange, setValues } = useForm<TvaluesStrings>({item: ''});
  const [isLoader, setLoader] = useState(false);
  const [itemsArr, setItemsArr] = useState<Array<Letter>>(Array(7));
  const [queue] = useState(new Queue<Letter>(7));

  const add = async() => {
    setLoader(true);
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
    setLoader(false)
  }

  const remove = async() => {
    setLoader(true);
    if (!queue.isEmpty()) {
      itemsArr[queue.head] = {value: values.item, color: ElementStates.Changing};
      await delay(SHORT_DELAY_IN_MS);
      queue.getArray()[queue.head - 1] = {value: '', color: ElementStates.Default};
      queue.dequeue();
      setItemsArr([...queue.getArray()]);
    }
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
      />
      <ul className={PanelStyle.itemList}>
        {itemsArr?.map((item, index)=> {
          return(<li key={index}>
            <Circle letter={item ? item.value : ''} index={index} state={item ? item.color : ElementStates.Default}/>
          </li>
          )
        })
      }
      </ul>
    </SolutionLayout>
  );
};
