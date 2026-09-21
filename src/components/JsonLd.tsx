/**
 * Emits a JSON-LD block.
 *
 * Rendered as a plain <script> in the server HTML so the markup is present in
 * the raw response, not injected after hydration — Google reads the served
 * HTML first, and structured data that only appears after JavaScript runs is
 * far less reliably picked up.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own typed data, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
