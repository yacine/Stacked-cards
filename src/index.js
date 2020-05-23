
import { gsap } from "gsap";
import { ScrollScene } from 'scrollscene';


class StackedCards {
  constructor(opts) {
    this.cards = document.querySelectorAll(opts.element);
    this.indicators = opts.indicators || false;
    this.pin = opts.pin || 80;
    this.offset = opts.offset || (this.cards[0].offsetHeight) / 4;
    this.init();
  }


  // Set styles
  // --------------------------------
  setStyle() {
    gsap.set(this.cards[0].parentElement, {
      perspective: 600,
      position: 'relative'
    })
    gsap.set(this.cards, {
      position: 'sticky',
      top: this.pin,
      transformOrigin: '50% 20%',
      marginBottom: this.offset
    })

    // Pervent first card collapse
    this.cards[0].style.marginTop = `${this.pin}px`;
    
  }

  // Scale down timeLine
  // --------------------------------
  cardScaleDownTl(el) {
    const timeline = gsap.timeline({
      paused: true
    });
    timeline
      .to(el, {
        ease: 'power1.out',
        scale: .7,
      })

      return timeline;
  }


  // Creating a card scene
  // --------------------------------
  CreateCardsScene(el) {
    return new ScrollScene({
      controller: {
        addIndicators: this.indicators,
      },
      triggerElement: el.nextElementSibling,
      offset: -(this.offset),
      triggerHook: .5,
      gsap: {
        timeline: this.cardScaleDownTl(el),
      },
      duration: '100%',
    })
  }

  // Creating scens and binding tweens to all cards
  // ------------------------------------------------
  init() {
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
  // pin: 80,
  // offset: 100,
  // indicators: true,
});

