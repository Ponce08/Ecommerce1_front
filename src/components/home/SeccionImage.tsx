import img_home1 from '../imagenes/img_home1.webp';

export const Seccion2 = () => {
  return (
    <div className="relative bg-gray-100 p-4">
      <div>
        <img src={img_home1} alt="Promoción" className="w-[500px] h-auto rounded shadow" />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Promoción</h1>
        <h3 className="text-lg text-gray-600 mt-2">Aprovecha las ofertas de hoy</h3>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Comprar</button>
      </div>
    </div>
  );
};
