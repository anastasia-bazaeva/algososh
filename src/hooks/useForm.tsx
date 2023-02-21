import { ChangeEventHandler, useState } from 'react';

export type TvaluesStrings = {
  [name: string]: string;
}

export type Tvaluesnumbers = {
  [name: string]: number;
}

export function useForm<T>(inputValues: T) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }