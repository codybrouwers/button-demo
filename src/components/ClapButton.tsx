// Copied and modified from https://github.com/JonathanDn/mediumclap / https://jsfiddle.net/urft14zr/425/
import { useRef, useState } from "react";
import { faHandPaper, faHandPeace } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ClapButton.module.scss";

// == Types ================================================================

interface IProps {
  clickCount: number;
  incrementClickCount: () => void;
}

// == Constants ============================================================

const MIN_DEGREE = 1;
const MAX_DEGREE = 72;
const DEFAULT_DURATION = 700;
const confettiClasses = ["popTop", "popTopLeft", "popTopRight", "popBottomRight", "popBottomLeft"];

// == Functions ============================================================

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// == Component ============================================================

export function ClapButton({ clickCount, incrementClickCount }: IProps) {
  const [icon, toggleIcon] = useState(faHandPaper);
  const clickCountContainer = useRef<HTMLDivElement | null>(null);
  const totalCountContainer = useRef<HTMLDivElement | null>(null);
  const clapButton = useRef<HTMLDivElement | null>(null);
  const confettiRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function runAnimationCycle(element: HTMLDivElement | null, className: string) {
    if (!element) return;

    if (!element.classList.contains(className)) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
      void element.offsetWidth; // Force a reflow in between toggling the class
      element.classList.add(className);
    }
  }

  function runConfettiAnimationCycle(element: Element, className: string) {
    if (element && !element.classList.contains(className)) {
      element.classList.add(className);
      setTimeout(() => {
        element.classList.remove(className);
      }, DEFAULT_DURATION);
    }
  }

  function addRandomConfettiRotation(confettiElement: HTMLDivElement) {
    const randomRotationAngle = `${getRandomInt(MIN_DEGREE, MAX_DEGREE)}deg`;
    confettiElement.style.transform = `rotate(${randomRotationAngle})`;
  }

  function animateConfetti(confettiElement: HTMLDivElement | null) {
    if (!confettiElement) return;

    addRandomConfettiRotation(confettiElement);
    for (let index = 0; index < confettiClasses.length; index += 1) {
      runConfettiAnimationCycle(confettiElement.children[index], styles[confettiClasses[index]]);
    }
    confettiElement.classList.add("animating");
    setTimeout(() => {
      confettiElement.classList.remove("animating");
    }, DEFAULT_DURATION);
  }

  const onClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    incrementClickCount();

    toggleIcon(faHandPeace);
    timeoutRef.current = setTimeout(() => {
      toggleIcon(faHandPaper);
    }, DEFAULT_DURATION);

    if (clickCountContainer.current?.classList.contains(styles.firstActive)) {
      runAnimationCycle(clickCountContainer.current, styles.active);
    } else {
      runAnimationCycle(clickCountContainer.current, styles.firstActive);
    }
    runAnimationCycle(clapButton.current, styles.scale);
    runAnimationCycle(totalCountContainer.current, styles.fader);

    const confetti = confettiRefs.current[0];
    const confetti1 = confettiRefs.current[1];
    const confetti2 = confettiRefs.current[2];
    if (confetti && !confetti.classList.contains("animating")) {
      animateConfetti(confetti);
    } else if (confetti1 && !confetti1.classList.contains("animating")) {
      animateConfetti(confetti1);
    } else if (confetti2 && !confetti2.classList.contains("animating")) {
      animateConfetti(confetti2);
    }
  };

  return (
    <div className={styles.canvas}>
      <div className={styles.totalCounter} ref={totalCountContainer}>
        {clickCount}
      </div>
      <div className={styles.clickCounter} ref={clickCountContainer}>
        <span className={styles.counter}>+{clickCount}</span>
      </div>
      <div
        className={styles.clapContainer}
        ref={clapButton}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onFocus={() => null}
        onKeyDown={onClick}
      >
        <FontAwesomeIcon className={styles.clapIcon} icon={icon} />
      </div>
      <div className={styles.rippleEffectContainer} />
      {Array(3)
        .fill(null)
        .map((_, index) => {
          return (
            <div
              className={styles.confettiContainer}
              id={`confetti-${index}`}
              key={index.toString()}
              ref={(ref) => {
                confettiRefs.current[index] = ref;
              }}
            >
              <div className={styles.triangle}>
                <div className={styles.square} />
              </div>
              <div className={styles.triangle}>
                <div className={styles.square} />
              </div>
              <div className={styles.triangle}>
                <div className={styles.square} />
              </div>
              <div className={styles.triangle}>
                <div className={styles.square} />
              </div>
              <div className={styles.triangle}>
                <div className={styles.square} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

// == Styles ===============================================================
