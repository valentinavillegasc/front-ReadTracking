import React from "react";
import style from "./Styles/CardsFunctions.module.css";
import book from "../assets/book.png";
import graphic from "../assets/graphic.png";
import notification from "../assets/notification.png";
import organice from "../assets/organice.png";
import thought from "../assets/thought.png";
export default function CardsFunctions() {
  return (
    <div className={style.cards}>
      <div className={style.card}>
        <img src={organice} alt="" className={style.logo} />
        <h2>Organize your reading like never before </h2>
        <p>
          Create personalized lists for the books you're currently reading,
          planning to read, or have already enjoyed. Visualize your progress at
          a glance and discover new literary gems.
        </p>
      </div>

      <div className={style.card}>
        <img src={book} alt="" className={style.logo} />
        <h2>Build your personal library</h2>
        <p>
          Record your favorite books with complete details: title, author,
          rating, genre, format, pages, and important dates. Transform your
          collection into an immersive experience.
        </p>
      </div>

      <div className={style.card}>
        <img src={thought} alt="" className={style.logo} />
        <h2>Bring your literary thoughts to life</h2>
        <p>
          Express yourself with summaries, opinions, and quotes. Share your
          reflections and discover what other readers are thinking. Each page
          tells a story, share yours!
        </p>
      </div>

      <div className={style.card}>
        <img src={graphic} alt="" className={style.logo} />
        <h2>Discover the power of your reading habits</h2>
        <p>
          Track your progress with detailed statistics. From the total number of
          pages read to the range of pages you tackled in a single day,
          understand your habits.
        </p>
      </div>

      <div className={style.card}>
        <img src={notification} alt="" className={style.logo} />
        <h2>An invitation to immerse yourself in reading</h2>
        <p>
          Receive perfectly synchronized reminders to stay in tune with your
          reading goals.
        </p>
      </div>
    </div>
  );
}
