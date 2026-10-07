import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CURSOR_SIZE = 40;
const DOT_SIZE = 5;

const FOLLOW_EASE = 0.16;
const HOVER_EASE = 0.18;

const MAGNETIC_PULL = 0.18;
const MAX_MAGNETIC_PULL = 7;

const HOVER_PADDING_X = 14;
const HOVER_PADDING_Y = 9;

const INTERACTIVE_SELECTOR =
  'a, button, .cursor-can-hover';

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.max(min, Math.min(max, value));
}

export default function ElasticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const pointer = useRef({
    x: -100,
    y: -100,
  });

  const cursor = useRef({
    x: -100,
    y: -100,
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    radius: CURSOR_SIZE / 2,
  });

  const velocity = useRef({
    x: 0,
    y: 0,
  });

  const activeTarget =
    useRef<HTMLElement | null>(null);

  const targetBounds = useRef<DOMRect | null>(
    null
  );

  const magneticOffset = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    if (!finePointer.matches) {
      return;
    }

    const cursorEl = cursorRef.current;
    const dotEl = dotRef.current;

    if (!cursorEl || !dotEl) {
      return;
    }

    document.documentElement.classList.add(
      'has-custom-cursor'
    );

    let animationFrame = 0;

    const moveCursor = (event: MouseEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;

      dotEl.style.transform = `
        translate3d(
          ${event.clientX - DOT_SIZE / 2}px,
          ${event.clientY - DOT_SIZE / 2}px,
          0
        )
      `;
    };

    const enterInteractive = (
      element: HTMLElement
    ) => {
      activeTarget.current = element;
      targetBounds.current =
        element.getBoundingClientRect();

      element.classList.add(
        'cursor-magnetic-active'
      );

      element.style.willChange = 'transform';
    };

    const leaveInteractive = () => {
      const element = activeTarget.current;

      if (element) {
        element.classList.remove(
          'cursor-magnetic-active'
        );

        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.55,
          ease: 'elastic.out(1, 0.45)',
          clearProps: 'transform',
          onComplete: () => {
            element.style.willChange = '';
          },
        });
      }

      activeTarget.current = null;
      targetBounds.current = null;

      magneticOffset.current.x = 0;
      magneticOffset.current.y = 0;
    };

    const handlePointerOver = (
      event: PointerEvent
    ) => {
      const target =
        event.target as HTMLElement | null;

      const interactive =
        target?.closest?.(
          INTERACTIVE_SELECTOR
        ) as HTMLElement | null;

      if (
        interactive === activeTarget.current
      ) {
        return;
      }

      if (activeTarget.current) {
        leaveInteractive();
      }

      if (interactive) {
        enterInteractive(interactive);
      }
    };

    const handleMouseLeave = () => {
      cursorEl.classList.add(
        'elastic-cursor-hidden'
      );

      dotEl.classList.add(
        'elastic-cursor-hidden'
      );

      leaveInteractive();
    };

    const handleMouseEnter = () => {
      cursorEl.classList.remove(
        'elastic-cursor-hidden'
      );

      dotEl.classList.remove(
        'elastic-cursor-hidden'
      );
    };

    const handleScroll = () => {
      if (activeTarget.current) {
        targetBounds.current =
          activeTarget.current.getBoundingClientRect();
      }
    };

    const animate = () => {
      const target = activeTarget.current;
      const bounds = targetBounds.current;

      /*
       * MODO HOVER / MAGNÉTICO
       */
      if (target && bounds) {
        const centerX =
          bounds.left + bounds.width / 2;

        const centerY =
          bounds.top + bounds.height / 2;

        const dx =
          pointer.current.x - centerX;

        const dy =
          pointer.current.y - centerY;

        const pullX = clamp(
          dx * MAGNETIC_PULL,
          -MAX_MAGNETIC_PULL,
          MAX_MAGNETIC_PULL
        );

        const pullY = clamp(
          dy * MAGNETIC_PULL,
          -MAX_MAGNETIC_PULL,
          MAX_MAGNETIC_PULL
        );

        magneticOffset.current.x +=
          (pullX -
            magneticOffset.current.x) *
          0.18;

        magneticOffset.current.y +=
          (pullY -
            magneticOffset.current.y) *
          0.18;

        /*
         * Movimiento magnético del elemento.
         */
        gsap.set(target, {
          x: magneticOffset.current.x,
          y: magneticOffset.current.y,
        });

        const destinationX =
          centerX +
          magneticOffset.current.x;

        const destinationY =
          centerY +
          magneticOffset.current.y;

        cursor.current.x +=
          (destinationX -
            cursor.current.x) *
          HOVER_EASE;

        cursor.current.y +=
          (destinationY -
            cursor.current.y) *
          HOVER_EASE;

        cursor.current.width +=
          (bounds.width +
            HOVER_PADDING_X * 2 -
            cursor.current.width) *
          HOVER_EASE;

        cursor.current.height +=
          (bounds.height +
            HOVER_PADDING_Y * 2 -
            cursor.current.height) *
          HOVER_EASE;

        cursor.current.radius +=
          (18 - cursor.current.radius) *
          HOVER_EASE;

        cursorEl.classList.add(
          'elastic-cursor-hover'
        );

        dotEl.classList.add(
          'elastic-dot-hover'
        );

        cursorEl.style.transform = `
          translate3d(
            ${
              cursor.current.x -
              cursor.current.width / 2
            }px,
            ${
              cursor.current.y -
              cursor.current.height / 2
            }px,
            0
          )
        `;

        cursorEl.style.width =
          `${cursor.current.width}px`;

        cursorEl.style.height =
          `${cursor.current.height}px`;

        cursorEl.style.borderRadius =
          `${cursor.current.radius}px`;
      }

      /*
       * MODO LIBRE
       */
      else {
        const previousX =
          cursor.current.x;

        const previousY =
          cursor.current.y;

        cursor.current.x +=
          (pointer.current.x -
            cursor.current.x) *
          FOLLOW_EASE;

        cursor.current.y +=
          (pointer.current.y -
            cursor.current.y) *
          FOLLOW_EASE;

        velocity.current.x =
          cursor.current.x - previousX;

        velocity.current.y =
          cursor.current.y - previousY;

        cursor.current.width +=
          (CURSOR_SIZE -
            cursor.current.width) *
          0.14;

        cursor.current.height +=
          (CURSOR_SIZE -
            cursor.current.height) *
          0.14;

        cursor.current.radius +=
          (CURSOR_SIZE / 2 -
            cursor.current.radius) *
          0.14;

        const speed = Math.min(
          Math.sqrt(
            velocity.current.x ** 2 +
              velocity.current.y ** 2
          ),
          28
        );

        /*
         * Deformación según velocidad.
         */
        const stretch =
          1 + speed * 0.016;

        const squash =
          1 - speed * 0.007;

        const angle =
          Math.atan2(
            velocity.current.y,
            velocity.current.x
          ) *
          (180 / Math.PI);

        cursorEl.classList.remove(
          'elastic-cursor-hover'
        );

        dotEl.classList.remove(
          'elastic-dot-hover'
        );

        cursorEl.style.width =
          `${cursor.current.width}px`;

        cursorEl.style.height =
          `${cursor.current.height}px`;

        cursorEl.style.borderRadius =
          `${cursor.current.radius}px`;

        cursorEl.style.transform = `
          translate3d(
            ${
              cursor.current.x -
              cursor.current.width / 2
            }px,
            ${
              cursor.current.y -
              cursor.current.height / 2
            }px,
            0
          )
          rotate(${angle}deg)
          scaleX(${stretch})
          scaleY(${squash})
        `;
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    window.addEventListener(
      'mousemove',
      moveCursor
    );

    document.addEventListener(
      'pointerover',
      handlePointerOver
    );

    document.documentElement.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    document.documentElement.addEventListener(
      'mouseenter',
      handleMouseEnter
    );

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    );

    animate();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        'mousemove',
        moveCursor
      );

      document.removeEventListener(
        'pointerover',
        handlePointerOver
      );

      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );

      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );

      window.removeEventListener(
        'scroll',
        handleScroll
      );

      document.documentElement.classList.remove(
        'has-custom-cursor'
      );

      leaveInteractive();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="elastic-cursor"
        aria-hidden="true"
      />

      <div
        ref={dotRef}
        className="elastic-cursor-dot"
        aria-hidden="true"
      />
    </>
  );
}