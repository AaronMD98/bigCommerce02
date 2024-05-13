import { PropsWithChildren } from 'react';
import { LocaleType } from '~/i18n';

interface Props extends PropsWithChildren {
  params: { locale: LocaleType };
}

export default async function DefaultLayout({ children, params: { locale } }: Props) {
  return (
    <div className="flex-1 px-6 pt-4 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">
      {children}
    </div>
  );
}
