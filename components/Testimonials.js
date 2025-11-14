const testimonials = [
  {
    quote: "I've never felt more confident in my skin. The Radiant Serum is pure magic!",
    author: "Jessica L.",
    rating: 5,
  },
  {
    quote: "The Velvet Lipstick is my new favorite. The color is stunning and it lasts all day without drying out my lips.",
    author: "Emily R.",
    rating: 5,
  },
  {
    quote: "Finally, a foundation that feels as good as it looks. The Glow Foundation is lightweight and gives me a perfect natural finish.",
    author: "Sarah P.",
    rating: 5,
  },
]

const Star = () => <span className="text-brand-pink">★</span>

export default function Testimonials() {
  return (
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-brand-light p-8 rounded-xl shadow-md">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} />)}
              </div>
              <p className="text-brand-dark/80 italic">"{testimonial.quote}"</p>
              <p className="mt-4 font-bold text-brand-dark">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}