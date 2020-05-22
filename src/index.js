
import { gsap } from "gsap";
import { ScrollScene } from 'scrollscene';

 
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
      ease: 'power1.out',
      scale: .7,
      y: -20
    })
    
    // Optional
    .to(el.querySelector('.mockup'), {
      ease: 'power1.out',
      y: 50,
      scale: .95
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