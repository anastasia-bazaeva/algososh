import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay, randomArr, swap } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import SortingStyles from './sorting.module.css';

export type NumberItem = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {

  const [sort, setSort] = useState('selection');
  const [direction, setDirection] = useState<Direction | undefined>(undefined);
  const [sortingArr, setSortingArr] = useState<Array<NumberItem>>([]);
  const [isLoader, setLoader] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value)
  }

  const handleClickDirection = (direction: Direction) => {
    setDirection(direction);
    pickSort(sortingArr, direction);
  }

  const handleClickNewArr = (e: SyntheticEvent) => {
    e.preventDefault();
    setSortingArr(randomArr(3, 17));
  }

  const pickSort = async(arr: Array<NumberItem>, direction: Direction) => {
    sort === "selection" ? selectionSort(arr, direction) : bubbleSort (arr, direction)
  }

  const selectionSort = async(arr: Array<NumberItem>, direction: Direction) => {
    setLoader(true);
    let last = arr.length - 1;
    for (let i = 0; i < last; i++) {
      let startInd = i;

      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setSortingArr([...arr]);

        arr.length > 10 ? await delay(300) : await delay(SHORT_DELAY_IN_MS);

        if (direction === Direction.Ascending) {
          if (arr[startInd].value > arr[j].value) {
            startInd = j;
          }
        } else if (direction === Direction.Descending) {
          if (arr[startInd].value < arr[j].value) {
            startInd = j;
          }
        }
        arr[j].color = ElementStates.Default;
        setSortingArr([...arr]);
      }
      swap(arr, i, startInd);
      arr[i].color = ElementStates.Modified;
    }
    arr[last].color = ElementStates.Modified;
    setLoader(false);
    setDirection(undefined);
  }

  const bubbleSort = async(arr: Array<NumberItem>, direction: Direction) => {
    setLoader(true)
    let last = arr.length - 1;
    let boofer = arr;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < last - i; j++) {
        //в каких-то случаях в самом конце сортировки почему-то первые два значения не всегда сортировались, добавила условия
        (direction === Direction.Ascending && j === boofer.length - i - 2 && boofer[j].value > boofer[j + 1].value) 
        ? swap(boofer, j, j + 1) : boofer[j].color = ElementStates.Changing;
        (direction === Direction.Descending && j === boofer.length - i - 2 && boofer[j].value < boofer[j + 1].value) 
        ? swap(boofer, j, j + 1) : boofer[j].color = ElementStates.Changing;
        
        (j === boofer.length - i - 2 && j === 0) 
        ? boofer[j].color = ElementStates.Modified 
        : boofer[j].color = ElementStates.Changing;
        (j === boofer.length - i - 2) 
        ? boofer[j + 1].color = ElementStates.Modified 
        : boofer[j + 1].color = ElementStates.Changing;

        setSortingArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if(direction === Direction.Ascending) {
          if(boofer[j].value > boofer[j + 1].value) {
            swap(boofer, j, j + 1);
          }
        } else if (direction === Direction.Descending) {
          if(boofer[j].value < boofer[j + 1].value) {
            swap(boofer, j, j + 1);
          }
        }
        boofer[j].color = ElementStates.Default;
      }
      boofer[last - i].color = ElementStates.Modified;
    }
    setLoader(false);
    setDirection(undefined);
  }

  useEffect(()=>{
    setSortingArr(randomArr(3, 17))
  },[])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={SortingStyles.sortingPanel}>
        <div className={SortingStyles.radioZone}>
          <RadioInput 
          label='Выбором'
          value='selection'
          onChange={onChange}
          checked={sort === 'selection'}
          disabled={isLoader}
          />
          <RadioInput 
          label='Пузырьком'
          value='bubble'
          onChange={onChange}
          checked={sort === 'bubble'}
          disabled={isLoader}
          />
        </div>
        <div className={SortingStyles.buttonZone}>
          <div className={SortingStyles.sortButtons}>
            <Button 
            text='По возрастанию'
            onClick={() => handleClickDirection(Direction.Ascending)}
            sorting={Direction.Ascending}
            isLoader={isLoader && direction === Direction.Ascending}
            extraClass={direction === Direction.Ascending ? SortingStyles.activeButton : ''}
            disabled={isLoader}
            />
            <Button 
            text='По убыванию'
            onClick={() => handleClickDirection(Direction.Descending)}
            sorting={Direction.Descending}
            isLoader={isLoader && direction === Direction.Descending}
            extraClass={direction === Direction.Descending ? SortingStyles.activeButton : ''}
            disabled={isLoader}
            />
          </div>
          <Button text='Новый массив'
          onClick={handleClickNewArr}
          extraClass={SortingStyles.button}
          disabled={isLoader}/>
        </div>
      </div>
      <ul className={SortingStyles.bars}>
        {sortingArr?.map((item, index) => {
          return (<li key={index}>
            <Column index={item?.value} state={item?.color}/>
          </li>)
        })}
      </ul>
    </SolutionLayout>
  );
};
