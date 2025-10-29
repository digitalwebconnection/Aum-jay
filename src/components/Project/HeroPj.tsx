
export default function ProjectsHero() {
  return (
    <section className="relative py-25 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://i0.wp.com/www.ecomena.org/wp-content/uploads/2024/08/optimal-solar-system-size.jpg"
          alt="Solar project site"
          className="h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl">
        <p className="uppercase tracking-widest text-sm font-semibold text-[#0DB02B] mb-3">
          Our Projects
        </p>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mx-auto max-w-3xl leading-tight">
        <span className=" text-green-600">Showcasing Solar Installations</span>   That Power Progress
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-200">
          Explore our diverse portfolio of residential, commercial, and industrial solar projects
          — each built with precision, performance, and trust.
        </p>


      </div>
    </section>
  );
}
