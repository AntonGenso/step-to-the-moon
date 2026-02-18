import styles from '../page.module.css';

export default function Home() {
  return (
    <main className="bg-black text-white">
      <section
        className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/home-page/s1-bg.svg")' }}
      >
        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent to-[#0B1120] backdrop-blur-md"></div>
      </section>

      <section className="aboutUs relative overflow-hidden bg-[#0B1120] py-[120px]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-[80px] px-6 md:flex-row">
          <div className="flex-1">
            <h2 className={`text-6xl font-extrabold ${styles.aboutTitle}`}>ABOUT US</h2>
            <h3 className={`text-3xl font-medium ${styles.aboutSubtitle}`}>GALAXY ACADEMY</h3>

            <div className={styles.aboutText}>
              <p className="flex justify-start">IT IS AN INTERACTIVE PLATFORM,</p>
              <p className="flex justify-end">WHERE WE EXPLORE SPACE,</p>
              <p className="flex justify-start">WE SOLVE EXCITING PROBLEMS,</p>
              <p className="flex justify-end">WE BUILD ROCKETS AND INTRODUCE</p>
            </div>

            <button className={styles.aboutButton}>SIGN UP</button>
          </div>

          <div className="flex flex-1 justify-center">
            <img src="/images/home-page/tablet.svg" alt="Tablet" className={styles.tabletImage} />
          </div>
        </div>

        <img
          src="/images/home-page/aboutUs-bg.svg"
          className="pointer-events-none absolute top-0 left-0 opacity-20"
          alt=""
        />
      </section>
    </main>
  );
}
