export const Seccion4 = () => {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-4xl font-medium leading-tight lg:text-5xl">
                Protect your future with trusted insurance
              </h1>
              <p className="text-lg text-gray-600">
                From life and health to property and auto insurance, we provide reliable protection for what matters most.
              </p>
            </div>
  
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="rounded bg-emerald-700 px-6 py-2 text-white hover:bg-emerald-800">
                Get a quote
              </button>
              <button className="rounded bg-[#D2F3BB] px-6 py-2 text-black hover:bg-[#bfe3a8]">
                Book a call
              </button>
            </div>
  
            {/* Stats */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <div className="text-4xl font-bold">99%</div>
                <div className="text-sm text-gray-600">Claim success rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold">25+</div>
                <div className="text-sm text-gray-600">Industry experience</div>
              </div>
            </div>
          </div>
  
          {/* Right Column */}
          <div className="space-y-8">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Happy family making roof gesture"
                className="w-full object-cover"
              />
            </div>
  
            {/* App Download and Reviews */}
            <div className="grid gap-8 sm:grid-cols-2">
              {/* App Download Section */}
              <div className="rounded-3xl bg-[#E6EBFF] p-6">
                <h3 className="mb-4 font-medium">Download app</h3>
                <div className="flex gap-3">
                  <button className="flex items-center rounded bg-white px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <img
                      src="/placeholder.svg?height=20&width=20"
                      alt="Apple App Store"
                      className="mr-2 h-5 w-5"
                    />
                    iOS
                  </button>
                  <button className="flex items-center rounded bg-white px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <img
                      src="/placeholder.svg?height=20&width=20"
                      alt="Google Play Store"
                      className="mr-2 h-5 w-5"
                    />
                    Android
                  </button>
                </div>
                <div className="mt-4">
                  <img
                    src="/placeholder.svg?height=300&width=200"
                    alt="Mobile app screenshot"
                    className="mx-auto w-auto"
                  />
                </div>
              </div>
  
              {/* Reviews Section */}
              <div className="rounded-3xl bg-[#E8F5DB] p-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gray-200"
                    />
                  ))}
                </div>
                <h3 className="mt-4 font-medium">
                  Authentic reviews from clients who trust us.
                </h3>
                <div className="mt-2 text-4xl font-bold text-emerald-700">200+</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  