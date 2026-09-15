import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/data/site';
import { ContactAtmosphere } from '@/components/contact-atmosphere';
import type { ReactNode } from 'react';
export function Contact({
  title,
  description,
  actionLabel,
}: { title?: ReactNode; description?: ReactNode; actionLabel?: string } = {}) {
  return (
    <section
      className="contact-section"
      id="contato"
      data-arrive
      data-inspect-label="Contact / next step"
    >
      <ContactAtmosphere />
      <div className="container contact-inner">
        <div className="contact-heading">
          <h2>
            {title || (
              <>
                Seu próximo produto
                <br />
                merece <span>atenção de perto.</span>
              </>
            )}
          </h2>
        </div>
        <div className="contact-bottom">
          <p>
            {description || (
              <>
                Um site com propósito. Um sistema que simplifica.
                <br />
                Uma ideia com espaço para crescer.
              </>
            )}
          </p>
          {site.contacts.length ? (
            <div className="contact-links">
              {site.contacts.map((contact) => (
                <a
                  key={contact.label}
                  className="button button-primary"
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {actionLabel ||
                    (contact.label === 'WhatsApp' ? 'Conversar no WhatsApp' : contact.label)}
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </div>
          ) : (
            <div className="contact-soon">
              <Link
                href="/projetos"
                className="contact-fallback"
                aria-label="Explorar projetos de Gabriel Carvalho"
              >
                Explorar projetos <ArrowUpRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
