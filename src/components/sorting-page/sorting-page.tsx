import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import SortingStyles from './sorting.module.css';

type NumberItem = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {

  const [sort, setSort] = useState('selection');
  const [direction, setDirection] = useState(Direction.Ascending)
  const [sortingArr, setSortingArr] = useState<Array<NumberItem>>([])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSort(e.target.value)
  }

  const handleClickDirection = (direction: Direction) => {
    setDirection(direction);
    console.log(direction)
  }

  const handleClickNewArr = (e: SyntheticEvent) => {
    e.preventDefault();
    setSortingArr(randomArr());
    console.log(sortingArr)
  }

  useEffect(()=>{
    setSortingArr(randomArr())
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
          />
          <RadioInput 
          label='Пузырьком'
          value='bubble'
          onChange={onChange}
          checked={sort === 'bubble'}
          />
        </div>
        <div className={SortingStyles.buttonZone}>
          <div className={SortingStyles.sortButtons}>
            <Button 
            text='По возрастанию'
            onClick={() => handleClickDirection(Direction.Ascending)}
            sorting={Direction.Ascending}
            extraClass={direction === Direction.Ascending ? SortingStyles.activeButton : ''}/>
            <Button 
            text='По убыванию'
            onClick={() => handleClickDirection(Direction.Descending)}
            sorting={Direction.Descending}
            extraClass={direction === Direction.Descending ? SortingStyles.activeButton : ''}/>
          </div>
          <Button text='Новый массив'
          onClick={handleClickNewArr}
          extraClass={SortingStyles.button}/>
        </div>
      </div>
      <ul className={SortingStyles.bars}>
        {sortingArr?.map((item, index) => {
          return (<li key={index}>
            <Column index={item.value} state={item.color}/>
          </li>)
        })}
      </ul>
    </SolutionLayout>
  );
};
