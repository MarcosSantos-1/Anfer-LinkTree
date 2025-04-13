import { ReactNode } from 'react';

interface SocialProps{
  url: string;
  children: ReactNode; //-> para receber como JSX (Ícones e demais coisas)
}

export function Social({ url, children }: SocialProps) {
  return (
      <a href={url}
         rel='noopener noreferrer'
         target='blank'>
        {children}
      </a>
  )
}

