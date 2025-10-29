
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactHero() {
    return (
        <section className="relative py-15 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000&auto=format&fit=crop"
                    alt="Contact Aumjay Solar"
                    className="h-full w-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl text-center px-6">
                <p className="uppercase tracking-widest text-sm font-semibold text-[#0DB02B] mb-3">
                    Get in Touch
                </p>

                <h1 className="text-4xl sm:text-5xl max-w-3xl mx-auto font-extrabold text-white leading-tight">
                    Let’s Power Your Tomorrow with <span className="text-[#0DB02B]">Solar Energy </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-gray-200">
                    Reach out to Aumjay Solar for consultations, site visits, and project proposals.
                    Our team is ready to guide you every step of the way.
                </p>

                {/* Contact Info */}
                <div className="mt-8 flex justify-between gap-4 text-left text-white/90">
                    <div className="flex items-center  justify-center sm:justify-start gap-2">
                        <div className="bg-black/90 flex px-8 py-1 rounded-full items-center gap-2">
                            <Phone className="h-5 w-5 text-[#0DB02B]" />
                            <span>+91 9321508896</span>
                        </div>

                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                         <div className="bg-black/90 flex px-8 py-1 rounded-full items-center gap-2">
                        <Mail className="h-5 w-5 text-[#0DB02B]" />
                        <span>info@aumjayrenewables.com</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                         <div className="bg-black/90 flex px-8 py-1 rounded-full items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#0DB02B]" />
                        <span>Mumbai, Maharashtra</span>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}
