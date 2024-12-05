import { Briefcase, Linkedin, Mail } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Imagen del perfil */}
          <div className="w-64 h-64 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0 bg-gray-300">
            <img
              src="src/components/imagenes/IMG-20240415-WA0021-removebg-preview.jpg"
              alt="Developer profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Información del desarrollador */}
          <div className="flex-1 space-y-4">
            <p className="text-md leading-relaxed">
              Soy un Desarrollador Full Stack con un enfoque en back-end, especializado en el diseño e implementación de aplicaciones web escalables y robustas. Me apasiona la creación y mantenimiento de APIs RESTful, la gestión de bases
              de datos como MongoDB y la optimización del rendimiento del servidor. También cuento con experiencia en la
              implementación de soluciones en entornos multiplataforma y el desarrollo de Single Page Applications (SPA) con
              JavaScript, TypeScript y Node.js (v16+).
            </p>
            <p className="text-md leading-relaxed">
              Mis habilidades técnicas incluyen conocimientos en React.js para el desarrollo de interfaces de usuario dinámicas y
              eficientes. Me mantengo actualizado con las últimas tendencias y frameworks de JavaScript, lo que me permite
              desarrollar código limpio, seguro y modular.
            </p>

            {/* Enlaces sociales */}
            <div className="flex gap-6 pt-4">
              <a href="mailto:yonathanponce2019@gmail.com" className="text-gray-600 hover:text-black" aria-label="Email contact">
                <Mail className="w-8 h-8" />
              </a>
              <a href="https://lc.cx/gUBxZP" className="text-gray-600 hover:text-black" aria-label="Portfolio">
                <Briefcase className="w-8 h-8" />
              </a>
              <a href="https://www.linkedin.com/in/yonathan-ponce/" className="text-gray-600 hover:text-black" aria-label="LinkedIn profile">
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
