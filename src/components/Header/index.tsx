import styles from "./Header.module.css";

export const Header: React.FC<{ title: string }> = ({ title = "" }) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_title}>
          <h2>{title}</h2>
        </div>
      </div>
    </>
  );
};
