import { unverifiedClaims } from '@/lib/site';
import { CheckIcon, ClockIcon, DocumentIcon, DropIcon, LeafIcon, ShieldIcon, TagIcon } from './Icons';

/**
 * Trust signals.
 *
 * Everything hard-coded here is a commitment about how the business works —
 * something within its control and true the day it decides to work that way.
 * None of it is a claim about accreditation, insurance cover or review scores.
 *
 * Those claims appear only when the owner enables them in src/lib/site.ts,
 * because they need evidence. Publishing an NCCA or WoolSafe badge without the
 * membership is trademark misuse; publishing an insurance figure without the
 * policy is a misrepresentation; publishing a review score without the reviews
 * risks a manual action. The defaults keep all three off.
 */

const commitments = [
  {
    icon: DropIcon,
    title: 'Fabric tested first',
    body: 'We read the care label and test on a hidden panel before any product touches the sofa. It is what stops a clean becoming a repair.',
  },
  {
    icon: TagIcon,
    title: 'Price fixed before we start',
    body: 'You get the final figure at the walk-through, before equipment comes off the van. If something changes it, you hear it then — not on the invoice.',
  },
  {
    icon: DocumentIcon,
    title: 'Itemised invoice',
    body: 'Dated, naming the address, every item cleaned and the method used on each. The format letting agents and deposit schemes actually accept.',
  },
  {
    icon: ClockIcon,
    title: 'Seven days a week',
    body: 'Bookings from 08:00 to 20:00, including weekends, and out-of-hours slots for commercial sites.',
  },
  {
    icon: LeafIcon,
    title: 'Neutral pH finish',
    body: 'A rinse brings the fabric back to neutral so no alkaline residue is left behind. Residue is why some sofas resoil faster after cleaning than before.',
  },
  {
    icon: CheckIcon,
    title: 'We say no when it is right',
    body: 'If a stain will not lift, or a piece needs a restorer rather than a cleaner, we tell you before taking the booking instead of after taking payment.',
  },
];

export function TrustSignals() {
  return (
    <section className="defer-paint bg-brand-50/60 py-14 sm:py-16">
      <div className="container-content">
        <div className="mx-auto max-w-prose text-center">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Six things we commit to on every job
          </h2>
          <p className="mt-3 prose-body">
            Not badges — commitments. Each one is something you can hold us to on the day.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((c) => (
            <li key={c.title} className="card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
                <c.icon className="h-[22px] w-[22px]" />
              </span>
              <h3 className="mt-4 text-[1.05rem] font-extrabold text-ink">{c.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{c.body}</p>
            </li>
          ))}
        </ul>

        <VerifiedClaims />
      </div>
    </section>
  );
}

/**
 * Renders the owner-enabled claims. Returns nothing at all while they are
 * disabled, which is the default — an empty space is better than a false badge.
 */
export function VerifiedClaims({ className = '' }: { className?: string }) {
  const { insurance, accreditations, trackRecord } = unverifiedClaims;
  const anything = insurance.enabled || accreditations.enabled || trackRecord.enabled;
  if (!anything) return null;

  return (
    <ul className={`mt-8 flex flex-wrap justify-center gap-3 ${className}`}>
      {insurance.enabled && (
        <Badge icon={<ShieldIcon className="h-4 w-4" />}>
          {insurance.cover} public liability{insurance.insurer ? ` · ${insurance.insurer}` : ''}
        </Badge>
      )}
      {accreditations.enabled &&
        accreditations.bodies.map((b) => (
          <Badge key={b} icon={<CheckIcon className="h-4 w-4" />}>
            {b}
          </Badge>
        ))}
      {trackRecord.enabled && (
        <Badge icon={<ClockIcon className="h-4 w-4" />}>
          {trackRecord.yearsTrading} years in business
        </Badge>
      )}
    </ul>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-bold text-brand-800">
      <span className="text-brand-600">{icon}</span>
      {children}
    </li>
  );
}
