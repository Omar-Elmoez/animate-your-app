import { Link } from "react-router-dom";

import cityImg from "../assets/city.jpg";
import heroImg from "../assets/hero.png";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WelcomePage() {
  const { scrollY } = useScroll();

  const cityOpacity = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [1, 0.5, 0.5, 0]
  );
  const cityPosition = useTransform(scrollY, [0, 200], [0, -100]);

  const heroOpacity = useTransform(scrollY, [0, 300, 500], [1, 1, 0]);
  const heroPosition = useTransform(scrollY, [0, 200], [0, -150]);

  const textScale = useTransform(scrollY, [0, 300], [1, 1.5]);
  const textPosition = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [0, 50, 50, 300]
  );

  const para = useRef();
  const isInView = useInView(para);

  return (
    <>
      <header id="welcome-header">
        <motion.div
          id="welcome-header-content"
          style={{ scale: textScale, y: textPosition }}
        >
          <h1>Ready for a challenge?</h1>
          <Link id="cta-link" to="/challenges">
            Get Started
          </Link>
        </motion.div>
        <motion.img
          style={{ opacity: cityOpacity, y: cityPosition }}
          src={cityImg}
          alt="A city skyline touched by sunlight"
          id="city-image"
        />

        <motion.img
          style={{ opacity: heroOpacity, y: heroPosition }}
          src={heroImg}
          alt="A superhero wearing a cape"
          id="hero-image"
        />
      </header>
      <main id="welcome-content">
        <section>
          <h2>There&apos;s never been a better time.</h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

        <section ref={para}>
          <h2
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "none" : "translateX(-500px)",
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
            }}
          >
            Why Challenge Yourself?
          </h2>
          <p
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "none" : "translateX(-500px)",
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
            }}
          >
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            “I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!” - Alex
            P.
          </p>
          {/* You can add more testimonials or even a carousel for multiple testimonials */}
        </section>
      </main>
    </>
  );
}
