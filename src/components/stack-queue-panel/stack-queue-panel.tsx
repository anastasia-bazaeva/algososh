import React from "react";
import { TvaluesStrings } from "../../hooks/useForm";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import PanelStyles from './stack-queue-panel.module.css';

interface TPanel {
    values: TvaluesStrings;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    setValues?: React.Dispatch<React.SetStateAction<TvaluesStrings>>;
    isLoader: boolean;
    add?: () => void;
    reset?: () => void;
    remove?: () => void;
    isEmpty?: boolean;
    activeButton?: string;
}

export const StackQueuePanel: React.FC<TPanel> = ({values, handleChange, isLoader, add, reset, remove, isEmpty, activeButton }) => {


    return (
    <div className={PanelStyles.panelZone}>
        <div className={PanelStyles.inputZone}>
            <Input
            name="item"
            placeholder="Введите текст"
            type="text"
            onChange={handleChange}
            maxLength={4}
            isLimitText={true}
            value={values.item}
            disabled={isLoader}
            />
            <Button
            text="Добавить"
            type="button"
            onClick={add}
            disabled={isLoader || values.item === ''}
            isLoader={activeButton === 'Добавить'}
            />
            <Button
            text="Удалить"
            type="button"
            disabled={isLoader || isEmpty}
            isLoader={activeButton === 'Удалить'}
            onClick={remove}
            />
        </div>
            <Button
            text="Очистить"
            type="button"
            onClick={reset}
            isLoader={activeButton === 'Очистить'}
            disabled={isLoader || isEmpty}
            />
    </div>
)
}