import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div>
        <h2>{product.title}</h2>
        <p>{product.price}</p>
      </div>
    </Link>
  );
}
