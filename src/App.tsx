import styles from "@styles/index.module.css";
import Logo from "./logo.svg";

const App = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          React + Webpack + TypeScript Boilerplate
        </h1>
        <Logo className={styles.logo} />
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>src/App.tsx</code>
        </p>
      </main>
    </div>
  );
};

export default App;
