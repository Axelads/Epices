import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Bienvenue dans le monde enchanté des Epices d&apos;Alain Grégoire</h1>
        <p>
          Découvrez notre large choix d&apos;épices du monde, nos différentes herbes, nos
          graines, nos poivres mais aussi nos folies éphémères.
        </p>
      </main>
    </div>
  );
}
