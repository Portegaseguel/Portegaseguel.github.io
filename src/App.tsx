import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroScene from './components/HeroScene';
import Projects from './components/Projects';
import TechOrbit from './components/TechOrbit';
import ElasticCursor from './components/ElasticCursor';

import { technicalProjects } from './data/projects';
import AnimatedTitle from './components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>('.reveal')
        .forEach((el) => {
          gsap.fromTo(
            el,
            {
              y: 34,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 86%',
              },
            }
          );
        });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <ElasticCursor />

      <header className="nav">
        <a
          href="#top"
          className="brand"
        >
          PO<span>.</span>
        </a>

        <nav>
          <a href="#about">
            Sobre mí
          </a>

          <a href="#projects">
            Proyectos
          </a>

          <a href="#tech">
            Stack
          </a>

          <a href="#contact">
            Contacto
          </a>
        </nav>
      </header>

      <main id="top">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">

          <div className="hero-copy">

            <div className="eyebrow">
              PORTAFOLIO · DISEÑO &amp; DESARROLLO
            </div>

            <h1>
              Paulina
              <br />
              Ortega <em>Seguel</em>
            </h1>

            <p className="hero-specialty">
              Diseño Web · Desarrollo · Soluciones Digitales
            </p>

            <div className="hero-actions">

              <a
                href="#projects"
                className="btn primary"
              >
                Ver proyectos
              </a>

              <a
                href="#contact"
                className="btn ghost"
              >
                Contactarme
              </a>

            </div>

            <small>
              Chile · Trabajo remoto
            </small>

          </div>

          <HeroScene />

          <div className="hero-note">
            <span>
              Diseño con criterio.
            </span>

            <b>
              Desarrollo con propósito.
            </b>
          </div>

        </section>

        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="about"
          className="about section-shell reveal"
        >

          <div className="section-head">
            <span>02</span>
            <div />
            <p>Sobre mí</p>
          </div>

          <div className="about-grid">

            <div>

            <AnimatedTitle>
              <span>Diseño que funciona.</span>
                <br />
                <em>
                  Código que sostiene.
                </em>
            </AnimatedTitle>

              <p>
                Trabajo de forma independiente en diseño y
                desarrollo web para emprendedores y pequeños
                negocios. Creo sitios orientados a presencia
                digital, ventas y captación de clientes.
              </p>

            </div>

            <div className="services">

              {[
                [
                  '01',
                  'Diseño web',
                  'Identidad visual, UX, arquitectura de contenidos y responsive.',
                ],
                [
                  '02',
                  'Desarrollo frontend',
                  'HTML5, CSS3/SCSS, JavaScript, Vue.js, Bootstrap y jQuery.',
                ],
                [
                  '03',
                  'E-commerce',
                  'WordPress, WooCommerce, pagos, formularios, WhatsApp y agenda.',
                ],
                [
                  '04',
                  'SEO & operación',
                  'SEO técnico/on-page, rendimiento, publicación, mantenimiento y soporte.',
                ],
              ].map((x) => (
                <article key={x[0]}>

                  <span>
                    {x[0]}
                  </span>

                  <div>

                    <h3>
                      {x[1]}
                    </h3>

                    <p>
                      {x[2]}
                    </p>

                  </div>

                </article>
              ))}

            </div>

          </div>

        </section>

        {/* =================================================
            PROJECTS
        ================================================= */}

        <Projects />

        {/* =================================================
            TECHNICAL PROJECTS
        ================================================= */}

        <section className="technical section-shell reveal">

          <div className="section-head">
            <span>04</span>
            <div />
            <p>
              Proyectos técnicos
            </p>
          </div>

          <h2 className="neon-sweep">
            Software &amp; <em>desarrollo</em>
          </h2>

          <div className="technical-list">

            {technicalProjects.map((p, i) => (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                key={p.title}
              >

                <span>
                  0{i + 1}
                </span>

                <div>

                  <h3>
                    {p.title}
                  </h3>

                  <small>
                    {p.meta}
                  </small>

                  <p>
                    {p.desc}
                  </p>

                </div>

                <b>
                  ↗
                </b>

              </a>
            ))}

          </div>

        </section>

        {/* =================================================
            STACK
        ================================================= */}

        <section
          id="tech"
          className="stack-section"
        >

          <div className="section-shell">

            <div className="section-head light">
              <span>05</span>
              <div />
              <p>
                Stack interactivo
              </p>
            </div>

            <div className="stack-grid">

              <div>

                <h2>
                  Tecnología que{' '}
                  <em>
                    se mueve.
                  </em>
                </h2>

                <p>
                Un stack construido para diseñar,
                desarrollar y llevar proyectos digitales
                desde la idea hasta producción.
                </p>

              </div>

              <TechOrbit />

            </div>

          </div>

        </section>

        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          id="contact"
          className="contact section-shell reveal"
        >

          <div className="section-head">
            <span>06</span>
            <div />
            <p>
              Contacto
            </p>
          </div>

          <div className="contact-grid">

            <div>

            <h2 className="contact-title">
              <span className="contact-neon-sweep">
                ¿Hablamos?
              </span>
            </h2>

              <p>
                Diseño y desarrollo soluciones digitales
                para negocios que necesitan comunicar mejor,
                vender o profesionalizar su presencia online.
              </p>

            </div>

            <div className="contact-links">

              <a href="mailto:frontend.portega@gmail.com">
                frontend.portega@gmail.com ↗
              </a>

              <a
                href="https://github.com/Portegaseguel"
                target="_blank"
                rel="noreferrer"
              >
                github.com/Portegaseguel ↗
              </a>

            </div>

          </div>

        </section>

      </main>

      <footer>
        Paulina Ortega Seguel · Diseño Web · Desarrollo ·
        Soluciones Digitales
      </footer>
    </>
  );
}