import Image from 'next/image';

export function ProfileAvatar({ preload = false }: { preload?: boolean }) {
  return (
    <span className="profile-avatar" aria-hidden="true">
      <Image
        src="/images/profile/gabriel-carvalho.png"
        alt=""
        fill
        sizes="80px"
        preload={preload}
      />
    </span>
  );
}

export function ProfilePortrait() {
  return (
    <figure className="profile-portrait" data-arrive>
      <div className="profile-portrait-image">
        <Image
          src="/images/profile/gabriel-carvalho.png"
          alt="Retrato de Gabriel Carvalho"
          fill
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 42vw, 520px"
        />
      </div>
      <figcaption>
        <span className="profile-portrait-label">Por trás de cada projeto</span>
        <strong>
          Gabriel Carvalho<span>.</span>
        </strong>
        <span>Desenvolvedor & Product Builder</span>
      </figcaption>
    </figure>
  );
}
