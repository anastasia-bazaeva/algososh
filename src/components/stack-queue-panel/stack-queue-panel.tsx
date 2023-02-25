import React, {ChangeEventHandler, FC, useEffect, useState} from "react";
import { Tvaluesnumbers, TvaluesStrings, useForm } from "../../hooks/useForm";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import PanelStyles from './stack-queue-panel.module.css';

interface TPanel {
    values: TvaluesStrings;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    setValues: React.Dispatch<React.SetStateAction<TvaluesStrings>>;
    isLoader: boolean;
    add: () => void;
    reset?: () => void;
    remove?: () => void;
}

export const StackQueuePanel: React.FC<TPanel> = ({values, handleChange, setValues, isLoader, add, reset, remove }) => {


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
            disabled={isLoader}
            />
            <Button
            text="Удалить"
            type="button"
            disabled={isLoader}
            onClick={remove}
            />
        </div>
            <Button
            text="Очистить"
            type="button"
            onClick={reset}
            disabled={isLoader}
            />
    </div>
)
}