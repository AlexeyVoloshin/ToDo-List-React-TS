import styles from "./Button.module.css";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleSubmit?: () => void;
}

export const Button: React.FC<IButtonProps> = ({ handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className={`${styles.btn} ${styles.btn_color}`}
    >
      Add Todo
    </button>
  );
};
