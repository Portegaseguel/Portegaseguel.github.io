import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import { commercialProjects } from '../data/projects';

export default function Projects() {
  const [i, setI] = useState(0);

  const p = commercialProjects[i];

  const viewportRef =
    useRef<HTMLDivElement | null>(null);

  const imageRef =
    useRef<HTMLImageElement | null>(null);

  const scrollRef = useRef(0);

  const [canScroll, setCanScroll] =
    useState(false);

  const [scrollProgress, setScrollProgress] =
    useState(0);

  const next = (d: number) => {
    setI(
      (v) =>
        (v + d + commercialProjects.length) %
        commercialProjects.length
    );
  };

  /*
   * Al cambiar de proyecto:
   * - volvemos al inicio
   * - reseteamos indicador
   */
  useEffect(() => {
    scrollRef.current = 0;
    setScrollProgress(0);
    setCanScroll(false);

    if (imageRef.current) {
      imageRef.current.style.transform =
        'translate3d(0, 0, 0)';
    }
  }, [i]);

  /*
   * Comprueba si la captura es más alta
   * que la ventana visible.
   */
  const updateScrollableState = () => {
    const viewport = viewportRef.current;
    const image = imageRef.current;

    if (!viewport || !image) {
      return;
    }

    const maxScroll = Math.max(
      0,
      image.offsetHeight -
        viewport.clientHeight
    );

    setCanScroll(maxScroll > 4);
  };

  /*
   * Scroll interno.
   *
   * IMPORTANTE:
   * usamos listener nativo con passive:false.
   *
   * Mientras el cursor esté sobre la captura:
   * - la página principal NO hace scroll
   * - la rueda controla exclusivamente la imagen
   */
  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const handleWheel = (
      event: globalThis.WheelEvent
    ) => {
      const image = imageRef.current;

      if (!image) {
        return;
      }

      /*
       * Siempre detenemos el scroll de la página
       * mientras el evento provenga del preview.
       */
      event.preventDefault();
      event.stopPropagation();

      const maxScroll = Math.max(
        0,
        image.offsetHeight -
          viewport.clientHeight
      );

      if (maxScroll <= 0) {
        return;
      }

      const current =
        scrollRef.current;

      /*
       * Ajusta esto si quieres más o menos velocidad.
       *
       * 0.55 = suave
       * 0.75 = normal
       * 1.00 = rápido
       */
      const sensitivity = 0.7;

      const nextScroll =
        current +
        event.deltaY * sensitivity;

      const clamped =
        Math.max(
          0,
          Math.min(
            maxScroll,
            nextScroll
          )
        );

      scrollRef.current =
        clamped;

      image.style.transform =
        `translate3d(0, -${clamped}px, 0)`;

      setScrollProgress(
        maxScroll > 0
          ? clamped / maxScroll
          : 0
      );
    };

    viewport.addEventListener(
      'wheel',
      handleWheel,
      {
        passive: false,
      }
    );

    return () => {
      viewport.removeEventListener(
        'wheel',
        handleWheel
      );
    };
  }, [i]);

  /*
   * Si cambia el tamaño de la pantalla,
   * recalculamos si existe scroll interno.
   */
  useEffect(() => {
    const handleResize = () => {
      updateScrollableState();
    };

    window.addEventListener(
      'resize',
      handleResize
    );

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );
    };
  }, []);

  const sectionStyle = {
    '--project-bg':
      p.palette.bg,

    '--project-ink':
      p.palette.ink,

    '--project-accent':
      p.palette.accent,

    '--project-accent2':
      p.palette.accent2,
  } as CSSProperties;

  return (
    <section
      id="projects"
      className="projects-section"
      style={sectionStyle}
    >
      <div className="section-shell project-shell">

        <div className="section-head">
          <span>
            03
          </span>

          <div />

          <p>
            Proyectos seleccionados
          </p>
        </div>

        <div className="project-stage">

          <div className="project-copy">

            <div className="project-index">
              0{i + 1} / 0
              {commercialProjects.length}
            </div>

            <p className="project-category">
              {p.category}
            </p>

            <h2>
              {p.title}
            </h2>

            <p className="project-summary">
              {p.summary}
            </p>

            <p className="project-role">
              <b>
                Rol
              </b>

              <br />

              {p.role}
            </p>

            <div className="chips">
              {p.tech.map((t) => (
                <span key={t}>
                  {t}
                </span>
              ))}
            </div>

            {p.url && (
              <a
                className="project-link"
                href={p.url}
                target="_blank"
                rel="noreferrer"
              >
                Ver proyecto ↗
              </a>
            )}

          </div>

          <div className="browser-3d">

            <div className="browser-top">
              <i />
              <i />
              <i />

              <b>
                {p.title}
              </b>
            </div>

            <div
              ref={viewportRef}
              className={
                canScroll
                  ? 'browser-viewport is-scrollable'
                  : 'browser-viewport'
              }
            >

              <img
                ref={imageRef}
                src={p.image}
                alt={`Captura de ${p.title}`}
                className="browser-page"
                onLoad={
                  updateScrollableState
                }
                draggable={false}
              />

              {canScroll && (
                <>

                  <div className="browser-scroll-hint">
                    <span>
                      Explorar sitio
                    </span>

                    <b>
                      ↓
                    </b>
                  </div>

                  <div className="browser-scroll-track">

                    <div
                      className="browser-scroll-progress"
                      style={{
                        height:
                          `${Math.max(
                            12,
                            scrollProgress * 100
                          )}%`,
                      }}
                    />

                  </div>

                </>
              )}

            </div>

          </div>

        </div>

        <div className="project-nav">

          <button
            onClick={() => next(-1)}
            aria-label="Proyecto anterior"
          >
            ←
          </button>

          <div>
            {commercialProjects.map(
              (x, n) => (
                <button
                  key={x.title}
                  className={
                    n === i
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setI(n)
                  }
                  aria-label={
                    `Ver ${x.title}`
                  }
                />
              )
            )}
          </div>

          <button
            onClick={() => next(1)}
            aria-label="Proyecto siguiente"
          >
            →
          </button>

        </div>

      </div>
    </section>
  );
}