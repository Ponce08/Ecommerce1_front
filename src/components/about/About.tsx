import img4 from '../imagenes/img4.jpg';
import img5 from '../imagenes/img5.png';

import { Link } from 'react-router-dom';

export function About() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-8 lg:px-8 mt-[100px]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img alt="" src={img5} className="mx-auto h-[8rem]" />
        <figure className="mt-10">
          <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
            <p>
              Desarrollador Full Stack con enfoque en back-end, especializado en el diseño de aplicaciones web
              escalables y robustas. Con experiencia en la implementación y el desarrollo de Single Page Applications (SPA) con
              JavaScript, TypeScript y Node.js (v16+).
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <Link to={'https://www.linkedin.com/in/yonathan-ponce/'} target="_blank">
              <img
                alt=""
                src={img4}
                className="mx-auto size-10 rounded-full transform hover:scale-125 transition-transform duration-300"
              />
            </Link>
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">Yonathan Ponce</div>
              <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-600">Full Stack Developer</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
