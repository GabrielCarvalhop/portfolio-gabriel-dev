import Image from 'next/image';

export function ProfileAvatar({ preload = false }: { preload?: boolean }) {
  return (
    <span className="profile-avatar" aria-hidden="true">
      <Image
        src="/images/profile/gabriel-carvalho.png"
        alt=""
        fill
        sizes="80px"
        quality={90}
        preload={preload}
      />
    </span>
  );
}
