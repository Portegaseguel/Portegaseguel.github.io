import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';

import type { IconType } from 'react-icons';

import {
  SiBootstrap,
  SiElementor,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiMysql,
  SiSass,
  SiTypescript,
  SiVuedotjs,
  SiWoocommerce,
  SiWordpress,
} from 'react-icons/si';

import { FaCss3Alt } from 'react-icons/fa';

type TechItem = {
  name: string;
  category: string;
  description: ReactNode;
  accent: string;
  Icon?: IconType;
  short?: string;
  dark?: boolean;
  widePanel?: boolean;
};

const techItems: TechItem[] = [
  {
    name: 'WordPress',
    category: 'CMS',
    description:
      'Desarrollo y administración de sitios corporativos, landing pages y proyectos autogestionables.',
    accent: '#21759b',
    Icon: SiWordpress,
  },

  {
    name: 'WooCommerce',
    category: 'E-commerce',
    description: (
      <>
        Implementación de tiendas online,
        <br />
        catálogo, pagos, variaciones,
        <br />
        checkout y flujo comercial.
      </>
    ),
    accent: '#96588a',
    Icon: SiWoocommerce,
    widePanel: true,
  },

  {
    name: 'Elementor',
    category: 'Maquetación visual',
    description:
      'Construcción de interfaces visuales con foco en rapidez, flexibilidad y edición simple para clientes.',
    accent: '#92003b',
    Icon: SiElementor,
  },

  {
    name: 'Vue.js',
    category: 'Frontend',
    description:
      'Desarrollo de interfaces dinámicas y componentes reutilizables para experiencias más interactivas.',
    accent: '#42b883',
    Icon: SiVuedotjs,
  },

  {
    name: 'Bootstrap',
    category: 'UI Framework',
    description:
      'Maquetación responsive y aceleración de interfaces limpias, ordenadas y consistentes.',
    accent: '#7952b3',
    Icon: SiBootstrap,
  },

  {
    name: 'HTML5',
    category: 'Estructura',
    description:
      'Base semántica del sitio: accesibilidad, jerarquía de contenido y estructura sólida.',
    accent: '#e34f26',
    Icon: SiHtml5,
  },

  {
    name: 'CSS3',
    category: 'Estilos',
    description:
      'Diseño visual, layouts, microinteracciones, animaciones y control fino de la presentación.',
    accent: '#1572b6',
    Icon: FaCss3Alt,
  },

  {
    name: 'SCSS',
    category: 'Arquitectura CSS',
    description:
      'Organización escalable de estilos mediante variables, mixins y estructura más mantenible.',
    accent: '#cc6699',
    Icon: SiSass,
  },

  {
    name: 'JavaScript',
    category: 'Interactividad',
    description:
      'Lógica del frontend, interacción del usuario, efectos visuales y comportamiento dinámico.',
    accent: '#f7df1e',
    Icon: SiJavascript,
  },

  {
    name: 'TypeScript',
    category: 'Código tipado',
    description:
      'Mayor robustez y orden en componentes y lógica del proyecto, ideal para interfaces complejas.',
    accent: '#3178c6',
    Icon: SiTypescript,
  },

  {
    name: 'jQuery',
    category: 'Legacy / Integración',
    description:
      'Resolución rápida de interacciones, compatibilidad y soporte en proyectos web existentes.',
    accent: '#0769ad',
    Icon: SiJquery,
  },

  {
    name: 'MySQL',
    category: 'Base de datos',
    description:
      'Gestión de contenido, estructura de datos y operación de sitios basados en WordPress.',
    accent: '#4479a1',
    Icon: SiMysql,
  },

  {
    name: 'Git',
    category: 'Versionado',
    description:
      'Control de cambios, orden de trabajo y trazabilidad durante el desarrollo.',
    accent: '#f05032',
    Icon: SiGit,
  },

  {
    name: 'GitHub',
    category: 'Repositorio',
    description:
      'Publicación de proyectos, control de versiones y colaboración técnica.',
    accent: '#24292e',
    Icon: SiGithub,
    dark: true,
  },

  {
    name: 'SEO',
    category: 'Optimización',
    description:
      'Buenas prácticas de posicionamiento: estructura, performance, indexación y visibilidad.',
    accent: '#14b8a6',
    short: 'SEO',
  },
];

const initialTech = techItems[0];

export default function TechOrbit() {
  const [active, setActive] =
    useState<TechItem>(initialTech);

  const [tilt, setTilt] = useState({
    x: 18,
    y: -16,
  });

  const handleMove = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const px =
      (event.clientX - rect.left) /
      rect.width;

    const py =
      (event.clientY - rect.top) /
      rect.height;

    const nextY =
      -16 + (px - 0.5) * 14;

    const nextX =
      18 - (py - 0.5) * 14;

    setTilt({
      x: nextX,
      y: nextY,
    });
  };

  const resetTilt = () => {
    setTilt({
      x: 18,
      y: -16,
    });
  };

  const boardStyle: CSSProperties = {
    transform: `
      perspective(1400px)
      rotateX(${tilt.x}deg)
      rotateY(${tilt.y}deg)
      rotateZ(-18deg)
    `,
  };

  const panelStyle = {
    '--panel-accent': active.accent,
  } as CSSProperties;

  const ActiveIcon = active.Icon;

  return (
    <div className="tech-showcase">

      <div
        className={`tech-panel ${
          active.widePanel
            ? 'is-wide'
            : ''
        }`}
        style={panelStyle}
      >
        <div className="tech-panel-top">

          <div
            className={`tech-panel-icon ${
              active.dark
                ? 'is-dark'
                : ''
            }`}
            style={{
              background:
                active.accent,
            }}
          >
            {ActiveIcon ? (
              <ActiveIcon />
            ) : (
              <span className="tech-panel-fallback">
                {active.short ??
                  active.name}
              </span>
            )}
          </div>

          <div className="tech-panel-copy">

            <span>
              {active.category}
            </span>

            <h3>
              {active.name}
            </h3>

          </div>

        </div>

        <p>
          {active.description}
        </p>

      </div>


      <div
        className="tech-board-wrap"
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
      >

        <div className="tech-board-glow" />

        <div
          className="tech-board"
          style={boardStyle}
        >

          <div className="tech-keys">

            {techItems.map((tech) => {

              const Icon =
                tech.Icon;

              const isActive =
                active.name ===
                tech.name;

              return (
                <button
                  key={tech.name}
                  type="button"

                  className={`tech-key ${
                    tech.dark
                      ? 'is-dark'
                      : ''
                  } ${
                    isActive
                      ? 'active'
                      : ''
                  }`}

                  onMouseEnter={() =>
                    setActive(tech)
                  }

                  onFocus={() =>
                    setActive(tech)
                  }

                  onClick={() =>
                    setActive(tech)
                  }

                  aria-label={
                    tech.name
                  }
                >

                  <span
                    className="tech-key-top"

                    style={
                      {
                        '--key-accent':
                          tech.accent,
                      } as CSSProperties
                    }
                  >

                    {Icon ? (
                      <Icon />
                    ) : (
                      <span className="tech-key-text">
                        {tech.short ??
                          tech.name}
                      </span>
                    )}

                  </span>

                  <span className="tech-key-label">
                    {tech.name}
                  </span>

                </button>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}