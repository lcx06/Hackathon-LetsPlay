import styles from "./AudioPlayer.module.css";

import prev from "assets/anterior.png";
import play from "assets/play.png";
import pause from "assets/pausa.png";
import next from "assets/siguiente.png";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { nextTrack, previousTrack } from "store";

const formatNumber = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

const getCurrentTime = (audio: HTMLAudioElement | null) => {
  if (!audio) return "00:00";

  const currentTime = audio.currentTime;
  const duration = audio.duration;

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);

  const minutesDuration = Math.floor(duration / 60);
  const secondsDuration = Math.floor(duration % 60);

  if (isNaN(minutesDuration) || isNaN(secondsDuration)) return "00:00";

  return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

const getBarWidth = (audio: HTMLAudioElement | null) => {
  if (!audio) return 0;

  const currentTime = audio.currentTime;
  const duration = audio.duration;

  const time = (currentTime / duration) * 100;
  return isNaN(time) ? 0 : time;
};

export default function AudioPlayer() {
  const timeRef = useRef<HTMLParagraphElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { playing, queue, shouldPlay }: { playing: number; queue: Array<string>, shouldPlay: boolean } =
    useAppSelector((state) => state.player);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    isPlaying ? audio?.pause() : audio?.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!audio) return;

    const handleTimeUpdate = () => {
      timeRef.current!.innerHTML = getCurrentTime(audio);
      barRef.current!.style.width = `${getBarWidth(audio)}%`;
    };

    audio.addEventListener("ended", () => dispatch(nextTrack()));
    audio.addEventListener("timeupdate", handleTimeUpdate);

    if (isPlaying) {
      if (playing === -1) setIsPlaying(false);
      else audio.play();
    }

    return () => {
      audio.removeEventListener("ended", () => setIsPlaying(false));
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio, isPlaying, dispatch, playing]);

  useEffect(() => {
    if (shouldPlay && audio) {
      setIsPlaying(true);
      audio?.play();
    }
  }, [shouldPlay, audio]);

  useEffect(() => {
    audio?.pause();
    setAudio(new Audio(queue[playing]));
  }, [playing, queue]); // eslint-disable-line react-hooks/exhaustive-deps
  // ^^^^ The audio should only be updated when the queue or the playing index changes

  return (
    <div className={styles.audio__container}>
      <img
        src={prev}
        alt="Previous"
        width={32}
        className={styles.audio__control}
        onClick={() => dispatch(previousTrack())}
      />
      <img
        src={isPlaying ? pause : play}
        alt="Play"
        width={32}
        height={32}
        className={styles.audio__control}
        onClick={() => handlePlay()}
      />
      <img
        src={next}
        alt="Next"
        width={32}
        className={styles.audio__control}
        onClick={() => dispatch(nextTrack())}
      />

      <div className={styles.audio__bar}>
        <div style={{ width: getBarWidth(audio) }} ref={barRef}></div>
      </div>

      <p className={styles.audio__time} ref={timeRef}>
        {getCurrentTime(audio)}
      </p>
    </div>
  );
}
