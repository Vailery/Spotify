import { ChangeEventHandler } from "react";
import styles from "./InputRange.module.css";

interface IProps {
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
  value: number;
  styleName?: string;
}

export const InputRange = ({
  minValue = 0,
  maxValue = 100,
  onChange,
  value,
  styleName,
}: IProps) => {
  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = parseInt(event.target.value);
    onChange(newValue);
  };

  const bgnd = () => {
    const progress = (value / maxValue) * 100;
    return `linear-gradient(to right, #ffffff 0%, #ffffff ${progress}%, #4d4d4d ${progress}%, #4d4d4d 100%)`;
  };

  return (
    <input
      className={`${styles.volume} ${styleName}`}
      type="range"
      min={minValue}
      max={maxValue}
      value={value}
      onChange={onChangeValue}
      style={{ background: `${bgnd()}` }}
    />
  );
};
