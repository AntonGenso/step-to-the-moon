import React, { useState } from "react";
import styles from "./leaderboard.module.scss";

interface Player {
  rank: number;
  name: string;
  avatar: string;
  classPoints: number;
  schoolPoints: number;
  cityPoints: number;
  countryPoints: number;
  total: number;
  highlight?: boolean;
}

const players: Player[] = [
  {
    rank: 1,
    name: "LABORLIS",
    avatar: "/images/profile/skin/svg/boy_dark.svg",
    classPoints: 444,
    schoolPoints: 500,
    cityPoints: 321,
    countryPoints: 280,
    total: 765,
    highlight: true
  },
  {
    rank: 2,
    name: "EMILIA",
    avatar: "/images/profile/skin/svg/girl_light.svg",
    classPoints: 286,
    schoolPoints: 450,
    cityPoints: 311,
    countryPoints: 270,
    total: 597
  },
  {
    rank: 3,
    name: "CHRISTOPHER",
    avatar: "/images/profile/skin/svg/boy_dark.svg",
    classPoints: 199,
    schoolPoints: 410,
    cityPoints: 290,
    countryPoints: 260,
    total: 489
  },
  {
    rank: 4,
    name: "PAUL",
    avatar: "/images/profile/skin/svg/boy_light.svg",
    classPoints: 112,
    schoolPoints: 300,
    cityPoints: 244,
    countryPoints: 200,
    total: 356
  }
];

const categories = ["CLASS", "SCHOOL", "CITY", "COUNTRY"] as const;

export default function Leaderboard() {
  const [viewMode, setViewMode] = useState<"PLAYER" | "TEAM">("PLAYER");
  const [category, setCategory] = useState<typeof categories[number]>("CLASS");

  const getPoints = (player: Player) => {
    switch (category) {
      case "CLASS": return player.classPoints;
      case "SCHOOL": return player.schoolPoints;
      case "CITY": return player.cityPoints;
      case "COUNTRY": return player.countryPoints;
    }
  };

  return (
    <div className={styles.leaderboard}>
      <div className={styles.topToggle}>
        <button
          className={viewMode === "PLAYER" ? styles.active : ""}
          onClick={() => setViewMode("PLAYER")}
        >
          PLAYER
        </button>
        <button
          className={viewMode === "TEAM" ? styles.active : ""}
          onClick={() => setViewMode("TEAM")}
        >
          TEAM
        </button>
      </div>

      <div className={styles.categoryTabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? styles.active : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className={styles.playerList}>
        {players.map((p) => (
          <li
            key={p.rank}
            className={`${styles.playerRow} ${p.highlight ? styles.highlight : ""}`}
          >
            <div className={styles.rank}>{p.rank}</div>
            <img src={p.avatar} alt={p.name} className={styles.avatar} />
            <div className={styles.name}>{p.name}</div>

            <div className={styles.points}>
              <div className={styles.pointItem}>
                <img src="/images/profile/leaderboard/star-score.svg" className="rounded-full" />
                <div>{getPoints(p)}</div>
              </div>

              <div className={`${styles.pointItem} ${styles.categoryPoints}`}>
                <img src="/images/profile/leaderboard/donetest.svg" className="rounded-full" />
                <div>{getPoints(p)}</div>
              </div>

              <div className={`${styles.pointItem} ${styles.total}`}>
                <div>TOTAL</div>
                <div>{p.total}</div>
              </div>
            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}
