export default function About() {
  return (
    <section id="about" className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">
              About Aura
            </h2>
            <p className="mt-6 text-lg text-brand-dark/80">
              At Aura, we believe that beauty is a form of self-expression. Our mission is to create high-quality, cruelty-free cosmetics that empower you to feel confident and radiant in your own skin.
            </p>
            <p className="mt-4 text-lg text-brand-dark/80">
              We are committed to using sustainable practices and ethically sourced ingredients, because we care about our planet as much as we care about your skin.
            </p>
          </div>
          <div className="w-full h-80 md:h-96 bg-brand-pink/20 rounded-xl flex items-center justify-center">
            {/* This could be an <Image /> component */}
            <p className="font-serif text-brand-pink-dark">Image Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  )
}