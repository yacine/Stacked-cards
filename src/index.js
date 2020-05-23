
import { gsap } from "gsap";
import { ScrollScene } from 'scrollscene';



class StackedCards {
  constructor(opts) {
    this.cards = document.querySelectorAll(opts.element);
    this.indicators = opts.indicators || false;
    this.pin = opts.pin || 80;
    this.offset = opts.offset || (this.cards[0].offsetHeight) / 2;
    this.init();
  }


  // Set styles
  // --------------------------------
  setStyle(el) {
    gsap.set(this.cards, {
      position: 'sticky',
      top: this.pin,
      marginBottom: this.offset
    })
  }

  // Scale down timeLine
  // --------------------------------
  cardScaleDownTl(el) {
    const timeline = gsap.timeline({
      paused: true
    });
    timeline
      .addLabel('in')
      .to(el, {
        ease: 'power1.out',
        scale: .7,
        y: -20
      })

    return timeline;
  }


  // Creating a card scene
  // --------------------------------
  CreateCardsScene(el, indicators) {
    return new ScrollScene({
      controller: {
        addIndicators: this.indicators,
      },
      triggerElement: el.nextElementSibling,
      // offset: -(this.offset),
      offset: 0,
      triggerHook: .5,
        addIndicators: true,
      gsap: {
        timeline: this.cardScaleDownTl(el),
      },
      duration: '100%',
    })
  }

  // Creating scens and binding tweens to all cards
  // ------------------------------------------------
  init() {
    console.log(this.offset);

    this.setStyle();
    
    for (let index = 0; index < this.cards.length - 1; index++) {
      this.CreateCardsScene(this.cards[index]);
    }
  }
}


// Stacked cards init
// -----------------------------

new StackedCards({
  element: '.card',
  indicators: true,
  pin: 100,
  offset: 120
});

