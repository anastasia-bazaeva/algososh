import React, { useEffect, useMemo, useState } from "react";
import { TvaluesStrings, useForm } from "../../hooks/useForm";
import { delay, randomArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list";
import ListStyles from './list-page.module.css';
import arrow from '../../images/icons/ChevronRight.svg';
import { Letter } from "../string/string";
import { NumberItem } from "../sorting-page/sorting-page";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const {values, handleChange, setValues } = useForm<TvaluesStrings>({item: '', index: ''});
  const [isLoader, setLoader] = useState(false);
  const [elemArr, setElemArr] = useState<Array<Letter | NumberItem>>([])
  const [list, setList] = useState<any>(null);

  useEffect(()=>{
    let randArr = randomArr(4, 6);
    setList(new LinkedList<any>(randArr));
    setElemArr(randArr);
  },[])

  const addToTail = async() => {
    setLoader(true);
    setValues({item: '', index: ''});
    await delay(SHORT_DELAY_IN_MS);
    list.addToTail({value: values.item,
    color: ElementStates.Modified});
    setElemArr(list.getArray());
    setLoader(false);
  }

  const addToHead = async() => {
    setLoader(true);
    setValues({item: '', index: ''});
    await delay(SHORT_DELAY_IN_MS);
    list.addToHead({value: values.item,
    color: ElementStates.Modified});
    setElemArr(list.getArray());
    setLoader(false);
  }

  const removeHead = async() => {
    setLoader(true);
    await delay(SHORT_DELAY_IN_MS);
    if(list.getSize() === 0) {
      setLoader(false);
    }
    list.removeHead();
    setElemArr(list.getArray());
    setLoader(false);
  }

  const removeTail = async() => {
    setLoader(true);
    await delay(SHORT_DELAY_IN_MS);
    if(list.getSize() === 0) {
      setLoader(false);
    }
    list.removeTail();
    setElemArr(list.getArray());
    setLoader(false);
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
        <Button
          type="button"
          text="Добавить в head"
          onClick={addToHead}
          disabled={isLoader || list?.getSize() > 7}/>
        <Button
          type="button"
          text="Добавить в tail"
          onClick={addToTail}
          disabled={isLoader || list?.getSize() > 7}/>
        <Button
          type="button"
          text="Удалить из head"
          onClick={removeHead}
          disabled={isLoader}/>
        <Button
          type="button"
          text="Удалить из tail"
          onClick={removeTail}
          disabled={isLoader}/>
        <Input
          extraClass={ListStyles.input}
          name="index"
          placeholder="Введите индекс"
          type="text"
          onChange={handleChange}
          maxLength={1}
          value={values.index}/>
        <Button 
          type="button"
          text="Добавить по индексу"
          extraClass={ListStyles.button5}
          disabled={isLoader || list?.getSize() > 7}/>
        <Button 
          type="button"
          text="Удалить по индексу"
          extraClass={ListStyles.button6}
          disabled={isLoader}/>
      </div>
      <ul className={ListStyles.circles}>
        {elemArr?.map((item, index) => {
          return(
            <li className={ListStyles.circleZone} key={index}>
              <Circle letter={item.value.toString()} index={index}/>
              {index === elemArr.length - 1 ? '' : <img className={ListStyles.arrow} src={arrow}/>}
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
