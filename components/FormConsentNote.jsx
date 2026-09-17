import Link from 'next/link';

export function FormConsentNote() {
  return (
    <p className="mt-4 text-center text-xs text-gray-400 leading-relaxed">
      By submitting your information, you consent to CosmeticChemist.com / Volkano Labs contacting you
      with the above information. Your information is never sold or distributed. See our{' '}
      <Link href="/privacy-policy" className="underline hover:text-white">
        Privacy Policy
      </Link>
      .
    </p>
  );
}
