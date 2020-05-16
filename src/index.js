
import { gsap } from "gsap";
import { ScrollScene} from 'scrollscene';

 
// Creating a card scene
// --------------------------------
function CreateCardsScene(el) {  
  return new ScrollScene({
    triggerElement: el.nextElementSibling,
    offset: -150,
    triggerHook: .5,
    gsap: {
      timeline: cardScaleDownTl(el),
    },
    duration: '100%',
  })
}

// Scale down timeLine
// --------------------------------
function cardScaleDownTl(el) {
  const timeline = gsap.timeline({ paused: true });
  timeline
    .addLabel('in')
    .to(el, {
      ease: 'none',
      scale: .6,
      rotateX: -90
    })
    
    // Optional
    .to(el.querySelector('.mockup'), {
      ease: 'power2.inOut',
      y: 100,
      scale: .7
    }, 'in')
  
    return timeline;
}


// Creating scens and binding tweens to all cards
// ------------------------------------------------
function stackedCards(cardClassName) {
  const cards = document.querySelectorAll(cardClassName);
  for (let index = 0; index < cards.length-1; index++) {
    CreateCardsScene(cards[index]);
  }
}

// Stacked cards init
// -----------------------------
stackedCards('.card');