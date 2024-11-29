import img_home2 from '../imagenes/img_home2.webp';

export const Seccion3 = () => {
  let stats = [
    { value: 8, label: 'Trainers' },
    { value: 25, label: 'Centers' },
    { value: '99%', label: 'Success Rate' }
  ];
  return (
    <section className="container mx-auto px-4 py-12 md:py-24 mb-10 bg-colorBackgroundMain">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img alt="Yoga instructor" className="overflow-hidden rounded-lg object-cover" src={img_home2} />
        </div>
        {/* Text Section */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Title and Description */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-zinc-500">The Best Yoga & Meditation studio</p>
              <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 md:text-5xl">Transform Your Life With Yoga</h1>
              <p className="text-zinc-500 md:text-lg lg:text-base xl:text-lg">
                Lorem ipsum dolor sit amet consectetur. Quisque accumsan nunc eget eu.
              </p>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700">Join Now</button>
              <button className="flex items-center gap-2 rounded border border-zinc-300 px-6 py-2 text-zinc-700 hover:bg-zinc-100">
                Play Video
              </button>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{stat.value}</h2>
                <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
