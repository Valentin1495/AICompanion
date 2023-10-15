'use client';

import { signOut } from 'next-auth/react';
import { ExitIcon } from '@radix-ui/react-icons';

export default function LogoutButton() {
  return (
    <button
      className='w-full flex items-center gap-x-1.5'
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      <ExitIcon className='w-6 h-6' />
      Sign out
    </button>
  );
}
