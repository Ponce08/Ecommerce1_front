import { Link } from 'react-router-dom';

const callouts = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://res.cloudinary.com/dm7llqul3/image/upload/v1738685858/Ecommerce_FyT/kiwyzzvbfvh54k8csr0o.webp',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    category: 'laptops'
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://res.cloudinary.com/dm7llqul3/image/upload/v1738686172/Ecommerce_FyT/bkkfmr3xolyay4lfmcvl.webp',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    category: 'tablets'
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/dm7llqul3/image/upload/v1738686075/Ecommerce_FyT/t0xbdxbcxwc05ahihyex.webp',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    category: 'mobile-accessories'
  }
];

export const Seccion2 = () => {
  return (
    <div className="bg-colorBackgroundMain">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout, index) => (
              <Link to={`/products/${callout.category}`} key={`${callout.name}-${index}`}>
                <div className="group relative">
                  <img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                  />
                  <h3 className="mt-6 text-sm text-gray-500">
                    <span className="absolute inset-0" />
                    {callout.name}
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
