import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const horizontalScroll = () => {
   const wrapper = document.getElementById("js_horizontalScroll");
   if (!wrapper) return false;
   const scenes = [...wrapper.getElementsByClassName("js_scene")];
   gsap.to(scenes, {
      xPercent: -100 * (scenes.length - 1),
      ease: "none",
      scrollTrigger: {
         trigger: wrapper,
         anticipatePin: 1,
         pin: true,
         scrub: 2,
         invalidateOnRefresh: true,
         end: () => {
            return wrapper.offsetWidth * 2;
         },
      },
   });
};
