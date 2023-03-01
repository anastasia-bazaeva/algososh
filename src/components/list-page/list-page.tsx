import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { delay, randomArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list";
import ListStyles from './list-page.module.css';
import arrow from '../../images/icons/ChevronRight.svg';
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type ListArray = {
  value: string | number;
  color: ElementStates;
  isUp?: boolean;
  isDown?: boolean;
  tempValue?: {item: string | number};
}

type ListForm = {
  item: string;
  index: number;
}


export const ListPage: React.FC = () => {
  const {values, handleChange, setValues } = useForm<ListForm>({item: '', index: -1});
  const [isLoader, setLoader] = useState(false);
  const [elemArr, setElemArr] = useState<Array<ListArray>>([])
  const [list, setList] = useState<LinkedList<ListArray> | null>(null);
  const [activeButton, setButton] = useState<string>('')

  useEffect(()=>{
    let randArr = randomArr(4, 6);
    setList(new LinkedList<ListArray>(randArr));
    setElemArr(randArr);
  },[])

  const addToTail = async() => {
    if (list) {
    setLoader(true);
    setButton('addTail');
    await delay(SHORT_DELAY_IN_MS);
    list.addToTail({value: values.item,
    color: ElementStates.Changing});
    elemArr[list!.getSize()-1] = {
      ...elemArr[list!.getSize()-1],
      isUp: true,
    }
    setElemArr([...elemArr]);
    await delay(SHORT_DELAY_IN_MS);
    setElemArr(list.getArray());
    elemArr[list.getSize()-1].color = ElementStates.Changing;
    setElemArr([...elemArr]);
    await delay(SHORT_DELAY_IN_MS);
    setElemArr(list.getArray());
    await delay(SHORT_DELAY_IN_MS);
    list.getArray()[list.getSize()-1].color = ElementStates.Modified;
    setElemArr(list.getArray());
    list.getArray()[list.getSize()-1].color = ElementStates.Default;
    await delay(SHORT_DELAY_IN_MS);

    setElemArr(list.getArray());
    setValues({item: '', index: -1});
    setButton('');
    setLoader(false);
    }
  }

  const addToHead = async() => {
    if (list) {
    setLoader(true);
    setButton('addHead');
    await delay(SHORT_DELAY_IN_MS);
    list.addToHead({value: values.item,
    color: ElementStates.Changing});
    elemArr[0] = {
      ...elemArr[0],
      isUp: true,
    }
    setElemArr([...elemArr]);
    await delay(SHORT_DELAY_IN_MS);

    setElemArr(list.getArray());
    elemArr[0].color = ElementStates.Changing;
    setElemArr([...elemArr]);
    await delay(SHORT_DELAY_IN_MS);
    setElemArr(list.getArray());
    await delay(SHORT_DELAY_IN_MS);
    list.getArray()[0].color = ElementStates.Modified;
    setElemArr(list.getArray());
    list.getArray()[0].color = ElementStates.Default;
    await delay(SHORT_DELAY_IN_MS);
    setElemArr(list.getArray());
    setValues({item: '', index: -1});
    setButton('');
    setLoader(false);
    }
  }

  const removeHead = async() => {
    if (list) {
    setLoader(true);
    setButton('removeHead');
    if(list.getSize() === 0) {
      setButton('');
      setLoader(false);
    }
    elemArr[0] = {
      ...elemArr[0],
      isDown: true,
      tempValue: {item: elemArr[0].value},
      value: '',
    }
    setElemArr([...elemArr]);
    await delay(SHORT_DELAY_IN_MS);
    list.removeHead();

    setElemArr(list.getArray());
    setButton('');
    setLoader(false);
   }
  }

  const removeTail = async() => {
    if (list) {
    setLoader(true);
    setButton('removeTail');
    await delay(SHORT_DELAY_IN_MS);
    if(list.getSize() === 0) {
      setButton('');
      setLoader(false);
    }
    elemArr[list.getSize()-1] = {
      ...elemArr[list.getSize()-1],
      isDown: true,
      tempValue: {item: elemArr[list.getSize()-1].value},
      value: '',
    }
    setElemArr([...elemArr]);
    await delay(SHORT_DELAY_IN_MS);
    list.removeTail();
    setElemArr(list.getArray());
    setButton('');
    setLoader(false);
   }
  }

  const addByPosition = async() => {
    if (list) {
    setLoader(true);
    setButton('addPosition');
    for (let i = 0; i <= values.index; i++ ) {
      if (i < list.getSize()) {
        elemArr[i] = {
          ...elemArr[i],
          isUp: true
        }
        elemArr[i].color = ElementStates.Changing;
        if (i > 0 && i < list.getSize()) {
          elemArr[i - 1].color = ElementStates.Changing;
        }
      }
      setElemArr([...elemArr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    await delay(SHORT_DELAY_IN_MS);
    list.addByPosition({value: values.item,
      color: ElementStates.Changing}, values.index);
    setElemArr(list.getArray());
    list.getArray()[values.index].color = ElementStates.Modified;
    setElemArr(list.getArray());
    await delay(SHORT_DELAY_IN_MS);
    list.getArray()[values.index].color = ElementStates.Default;
    setElemArr(list.getArray());
    setValues({item: '', index: -1});
    setButton('');
    setLoader(false);
    }
  }

  const removeByPosition = async() => {
    if (list) {
    setLoader(true);
    setButton('removePosition');
    for(let i = 0; i < values.index; i++) {
      elemArr[i].color = ElementStates.Changing;
      setElemArr([...elemArr]);
      await delay(SHORT_DELAY_IN_MS);
    }

    elemArr[values.index] = {
      ...elemArr[values.index],
      isDown: true,
      tempValue: {item: elemArr[values.index].value},
      value: '',
    }
    setElemArr([...elemArr]);
    await delay(SHORT_DELAY_IN_MS);
    list.removeByPosition(values.index);
    for(let i = 0; i < values.index; i++) {
      elemArr[i].color = ElementStates.Default;
      setElemArr([...elemArr]);
    }
    setElemArr(list.getArray());
    setValues({item: '', index: -1});
    setButton('');
    setLoader(false);
   }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={ListStyles.panel}>
        <Input
        extraClass={ListStyles.input}
        name="item"
        placeholder="Введите значение"
        type="text"
        onChange={handleChange}
        value={values.item}
        maxLength={4}
        isLimitText={true}/>
        {list && (
        <><Button
          type="button"
          text="Добавить в head"
          onClick={addToHead}
          isLoader={activeButton === 'addHead'}
          disabled={isLoader || list?.getSize() > 7 || values.item === ''}/>
        <Button
          type="button"
          text="Добавить в tail"
          onClick={addToTail}
          isLoader={activeButton === 'addTail'}
          disabled={isLoader || list?.getSize() > 7 || values.item === ''}/>
        <Button
          type="button"
          text="Удалить из head"
          onClick={removeHead}
          isLoader={activeButton === 'removeHead'}
          disabled={isLoader}/>
        <Button
          type="button"
          text="Удалить из tail"
          onClick={removeTail}
          isLoader={activeButton === 'removeTail'}
          disabled={isLoader}/></>)}
        <Input
          extraClass={ListStyles.input}
          name="index"
          placeholder="Введите индекс"
          type="text"
          onChange={handleChange}
          maxLength={1}
          value={values.index >= 0 ? values.index : ''}/>
        {list && (
        <><Button 
          type="button"
          text="Добавить по индексу"
          extraClass={ListStyles.button5}
          onClick={addByPosition}
          isLoader={activeButton === 'addPosition'}
          disabled={isLoader || list?.getSize() > 7 || values.index < 0 || values.index > (list?.getSize() - 1) || values.item === ''}/>
        <Button 
          type="button"
          text="Удалить по индексу"
          extraClass={ListStyles.button6}
          onClick={removeByPosition}
          isLoader={activeButton === 'removePosition'}
          disabled={isLoader || values.index < 0 || values.index > (list?.getSize() - 1)}/></>)}
      </div>
      <ul className={ListStyles.circles}>
        {elemArr?.map((item, index) => {
          return(
            <li className={ListStyles.circleZone} key={index}>
              <Circle 
              extraClass={ListStyles.circle}
              letter={item.value ? item.value.toString() : ''} 
              index={index} 
              state={item?.color} 
              head={index !== 0 || item.isUp ? '' : 'head'} 
              tail={index !== elemArr.length - 1 || item.isDown ? '' : 'tail'}/>
              {index === elemArr.length - 1 ? '' : <img className={ListStyles.arrow} src={arrow} alt="стрелочка указывающая на следующий элемент"/>}
              {item.isUp && ( <Circle 
                letter={values.item.toString()}
                isSmall={true}
                state={ElementStates.Changing}
                extraClass={ListStyles.miniCircleUp}/>
              )}
              {item.isDown && ( <Circle 
                letter={item.tempValue?.item.toString()}
                isSmall={true}
                state={ElementStates.Changing}
                extraClass={ListStyles.miniCircleDown}/>
              )}
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
