import React from "react";
import styles from "./InputField.module.css";
import { Button } from "../Button";
import { useAppSelector } from "../../hook";
import classNames from "classnames";
import { ThemeState } from "../../types";

interface IProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

export const InputField: React.FC<IProps> = ({
  text,
  handleSubmit,
  setText,
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  const theme = useAppSelector((state) => state.theme);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_wrapper}>
          <label htmlFor="textInpout" title="Select text" />
          <input
            id="textInpout"
            value={text}
            onChange={handleInput}
            className={classNames(styles.input, {
              [styles.activeThemeLight]: theme === ThemeState.light,
            })}
          />
        </div>
        <Button type="submit" />
      </form>
    </>
  );
};
