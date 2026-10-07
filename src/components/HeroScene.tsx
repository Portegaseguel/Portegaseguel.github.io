import { useEffect, useMemo, useRef, useState } from 'react';

type AvatarPose =
  | 'front'
  | 'left'
  | 'right'
  | 'up'
  | 'down'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';

const images: Record<AvatarPose, string> = {
  front: '/images/avatar/avatar-front.png',
  left: '/images/avatar/avatar-left.png',
  right: '/images/avatar/avatar-right.png',
  up: '/images/avatar/avatar-up.png',
  down: '/images/avatar/avatar-down.png',
  'up-left': '/images/avatar/avatar-up-right.png',
  'up-right': '/images/avatar/avatar-up-left.png',
  'down-left': '/images/avatar/avatar-down-left.png',
  'down-right': '/images/avatar/avatar-down-right.png',
};

const blinkImage = '/images/avatar/avatar-blink.png';

function choosePose(x: number, y: number): AvatarPose {
  const center = 0.14;
  const diagonalThreshold = 0.22;

  if (Math.abs(x) < center && Math.abs(y) < center) {
    return 'front';
  }

  const horizontal = Math.abs(x);
  const vertical = Math.abs(y);

  const diagonal =
    horizontal > diagonalThreshold &&
    vertical > diagonalThreshold;

  if (diagonal) {
    if (x < 0 && y < 0) return 'up-left';
    if (x > 0 && y < 0) return 'up-right';
    if (x < 0 && y > 0) return 'down-left';
    return 'down-right';
  }

  if (horizontal > vertical) {
    return x < 0 ? 'left' : 'right';
  }

  return y < 0 ? 'up' : 'down';
}

export default function HeroScene() {
  const [pose, setPose] = useState<AvatarPose>('front');
  const [isBlinking, setIsBlinking] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  const parallax = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });

  const lastPose = useRef<AvatarPose>('front');

  /*
   * Precarga todas las imágenes
   */
  useEffect(() => {
    [
      ...Object.values(images),
      blinkImage,
    ].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /*
   * Captura mouse
   */
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      target.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      target.current.y =
        (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleMouseLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
    };
  }, []);

  /*
   * Movimiento general:
   * - suavizado
   * - selección de pose
   * - parallax
   * - idle
   */
  useEffect(() => {
    let animationFrame = 0;

    const animate = (time: number) => {
      /*
       * Seguimiento amortiguado.
       * Un valor más bajo = más suave.
       */
      const follow = 0.075;

      smooth.current.x +=
        (target.current.x - smooth.current.x) * follow;

      smooth.current.y +=
        (target.current.y - smooth.current.y) * follow;

      /*
       * Hacemos el movimiento ligeramente menos sensible
       * que la posición real del mouse.
       */
      const lookX = smooth.current.x * 0.92;
      const lookY = smooth.current.y * 0.88;

      const nextPose = choosePose(lookX, lookY);

      /*
       * Solo actualizamos React cuando realmente cambia
       * la pose. Esto evita renders innecesarios.
       */
      if (
        !isBlinking &&
        nextPose !== lastPose.current
      ) {
        lastPose.current = nextPose;
        setPose(nextPose);
      }

      /*
       * Parallax suave del personaje completo
       */
      const targetParallaxX = lookX * 13;
      const targetParallaxY = lookY * 7;

      parallax.current.x +=
        (targetParallaxX - parallax.current.x) * 0.08;

      parallax.current.y +=
        (targetParallaxY - parallax.current.y) * 0.08;

      /*
       * Rotación mínima.
       * La mantenemos muy pequeña porque la imagen
       * sigue siendo 2D.
       */
      const targetRotationY = lookX * 1.3;
      const targetRotationX = -lookY * 0.65;

      rotation.current.y +=
        (targetRotationY - rotation.current.y) * 0.07;

      rotation.current.x +=
        (targetRotationX - rotation.current.x) * 0.07;

      /*
       * Idle:
       * pequeños movimientos aunque el usuario
       * mantenga quieto el mouse.
       */
      const idleY = Math.sin(time * 0.00115) * 2.2;
      const idleX = Math.sin(time * 0.00063) * 0.8;
      const idleRotate =
        Math.sin(time * 0.00082) * 0.12;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `
          translate3d(
            ${parallax.current.x + idleX}px,
            ${parallax.current.y + idleY}px,
            0
          )
          rotateX(${rotation.current.x}deg)
          rotateY(${rotation.current.y + idleRotate}deg)
        `;
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isBlinking]);

  /*
   * Parpadeo
   */
  useEffect(() => {
    let nextBlinkTimer: number;
    let closeTimer: number;
    let secondBlinkTimer: number;

    const restorePose = () => {
      const nextPose = choosePose(
        smooth.current.x,
        smooth.current.y
      );

      lastPose.current = nextPose;
      setPose(nextPose);
    };

    const performBlink = (
      allowDoubleBlink = true
    ) => {
      setIsBlinking(true);

      closeTimer = window.setTimeout(() => {
        setIsBlinking(false);
        restorePose();

        /*
         * Aproximadamente 1 de cada 5 parpadeos
         * será doble.
         */
        if (
          allowDoubleBlink &&
          Math.random() < 0.2
        ) {
          secondBlinkTimer = window.setTimeout(
            () => {
              setIsBlinking(true);

              window.setTimeout(() => {
                setIsBlinking(false);
                restorePose();
              }, 105);
            },
            140
          );
        }
      }, 110);
    };

    const scheduleNextBlink = () => {
      /*
       * Intervalo menos mecánico:
       * 2.8 a 6.4 segundos.
       */
      const delay =
        2800 + Math.random() * 3600;

      nextBlinkTimer = window.setTimeout(() => {
        performBlink();
        scheduleNextBlink();
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      window.clearTimeout(nextBlinkTimer);
      window.clearTimeout(closeTimer);
      window.clearTimeout(secondBlinkTimer);
    };
  }, []);

  const currentImage = useMemo(
    () => (
      isBlinking
        ? blinkImage
        : images[pose]
    ),
    [isBlinking, pose]
  );

  return (
    <div
      className="hero-scene hero-avatar-scene"
      aria-label="Avatar interactivo de Paulina"
    >
      <div
        ref={wrapperRef}
        className="avatar-wrapper"
      >
        <img
          src={currentImage}
          alt=""
          className="avatar-interactive"
          draggable={false}
        />
      </div>
    </div>
  );
}