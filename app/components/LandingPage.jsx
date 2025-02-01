"use client";
import { useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";
import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { CustomEase } from "gsap/dist/CustomEase";
import SplitType from "split-type";

gsap.registerPlugin(Flip, CustomEase);

const Landing = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create custom easing functions
    CustomEase.create(
      "hop",
      "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1"
    );
    CustomEase.create(
      "hop2",
      "M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1"
    );

    const splitH2 = new SplitType(`.${styles.siteInfo} h2`, {
      types: "lines",
    });

    console.log(SplitType);
    console.log(splitH2);

    splitH2.lines.forEach((line) => {
      const text = line.textContent;
      const wrapper = document.createElement("div");
      wrapper.className = styles.line;
      const span = document.createElement("span");
      span.textContent = text;
      wrapper.appendChild(span);
      line.parentNode.replaceChild(wrapper, line);
    });

    // GSAP timelines
    const mainTl = gsap.timeline();
    const revealerTl = gsap.timeline();
    const scaleTl = gsap.timeline();

    // Revealer animation
    revealerTl
      .to(`.${styles.revealer}.r1`, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: "hop",
      })
      .to(
        `.${styles.revealer}.r2`,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "hop",
        },
        "<"
      );

    // Scale animation for images
    scaleTl.to(`.${styles.img}:first-child`, {
      scale: 1,
      duration: 2,
      ease: "power4.inOut",
    });

    const images = document.querySelectorAll(
      `.${styles.img}:not(:first-child)`
    );

    images.forEach((img, index) => {
      scaleTl.to(
        img,
        {
          opacity: 1,
          scale: 1,
          // duration: 1.25,
          duration: 1,
          ease: "power3.out",
        },
        ">-0.5"
      );
    });

    // Main timeline
    mainTl
      .add(revealerTl)
      .add(scaleTl, "-=1.25")
      .add(() => {
        // Remove non-main images
        document
          .querySelectorAll(`.${styles.img}:not(.${styles.main})`)
          .forEach((img) => img.remove());

        // Get the state of the main images before the Flip
        const state = Flip.getState(`.${styles.main}`);

        // Add the stacked container class
        const imagesContainer = document.querySelector(`.${styles.images}`);
        imagesContainer.classList.add(styles.stackedContainer);

        // Apply stacked class to main images and set their order
        document.querySelectorAll(`.${styles.main}`).forEach((img, i) => {
          // Use template literals to add the scoped class name
          img.className = `${styles.img} ${styles.main} ${styles.stacked}`;
          img.style.order = i;
          gsap.set(img, {
            clearProps: "transform, top, left",
          });
        });

        // Perform the Flip animation
        Flip.from(state, {
          duration: 2,
          ease: "hop",
          absolute: true,
          stagger: {
            amount: -0.3,
          },
        });
      })
      .to(
        `.${styles.word} h1, .${styles.navItem} p, .${styles.line} p, .${styles.siteInfo} h2 .${styles.line} span`,
        {
          y: 0,
          duration: 3,
          ease: "hop2",
          stagger: 0.1,
          delay: 1.25,
        }
      )
      .to(`.${styles.coverImg}`, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 2,
        ease: "hop",
        delay: -4.75,
      });
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.revealers}>
        <div className={`${styles.revealer} r1`}></div>
        <div className={`${styles.revealer} r2`}></div>
      </div>

      <div className={styles.images}>
        <div className={styles.img}>
          <img
            src="https://images.unsplash.com/photo-1421217336522-861978fdf33a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={styles.img}>
          <img
            src="https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={styles.img}>
          <img
            src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={styles.img}>
          <img
            src="https://plus.unsplash.com/premium_photo-1681486356838-03e4e7c5fd35?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={styles.img}>
          <img
            src="https://images.unsplash.com/photo-1421217336522-861978fdf33a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={`${styles.img} ${styles.main}`}>
          <img
            src="https://images.unsplash.com/photo-1486092642310-0c4e84309adb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={`${styles.img} ${styles.main}`}>
          <img
            src="https://images.unsplash.com/photo-1587731556938-38755b4803a6?q=80&w=2678&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={`${styles.img} ${styles.main}`}>
          <img
            src="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.siteLogo}>
          <div className={styles.word}>
            <h1 className="font-accent">Radiate</h1>
          </div>
          <div className={styles.word}>
            <h1 className="font-accent">Happy ツ</h1>
          </div>
        </div>

        <div className={styles.nav}>
          <div className={styles.navItem}>
            <p>About</p>
          </div>
          <div className={styles.navItem}>
            <p>Work</p>
          </div>
          <div className={styles.navItem}>
            <p>Journal</p>
          </div>
          <div className={styles.navItem}>
            <p>Contact</p>
          </div>
        </div>

        <div className={styles.coverImg}>
          <img
            src="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>

        <div className={styles.siteInfo}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.line}>{/* <p>Featured Works</p> */}</div>
            </div>
            <div className={styles.col}>
              {/* <h2>
                Arc is a contemporary fashion brand redefining elegance with
                timeless designs and innovative aesthetics.
              </h2> */}
              <h2>
                Driven by a passion for technology's transformative power, we
                specialise in crafting delightful experiences that empower
                individuals and create strong, connected communities.
                <span className="block mb-6" />
                <span />
                We are particularly passionate about reimagining education,
                connection, and wellness through innovative tech solutions that
                inspire growth and well-being.
              </h2>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}></div>
            <div className={styles.col}>
              <div className={styles.address}>
                <div className={styles.line}>
                  <p>Auckland</p>
                </div>
                <div className={styles.line}>
                  <p>New Zealand</p>
                </div>
                {/* <div className={styles.line}>
                  <p>Street Addy</p>
                </div>
                <div className={styles.line}>
                  <p>N1 4DX</p>
                </div> */}
              </div>
              <div className={styles.socials}>
                <div className={styles.line}>
                  <p>Hello@Rd8.com</p>
                </div>
                <div className={styles.line}>
                  <p>LinkedIn</p>
                </div>
                <div className={styles.line}>
                  <p>Email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
