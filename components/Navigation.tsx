'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Logo } from '../app/Logo';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  subtitle?: string;
  showNewSession?: boolean;
  onNewSession?: () => void;
}

export function Navigation({ subtitle, showNewSession, onNewSession }: NavigationProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-gray-200 flex-shrink-0 bg-white">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <Logo className="h-6 w-auto text-gray-900" />
            <h1 className="text-xl font-semibold text-gray-900">AceTheRole</h1>
            {subtitle && (
              <span className="text-sm text-gray-500 ml-2">{subtitle}</span>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className={`text-sm font-medium px-3 py-1.5 rounded transition-colors ${
                isActive('/') && !isActive('/question-bank')
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              AI Generation
            </Link>
            
            <Link 
              href="/question-bank"
              className={`text-sm font-medium px-3 py-1.5 rounded transition-colors ${
                isActive('/question-bank')
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Question Bank
            </Link>

            <Link 
              href="/profile"
              className={`text-sm font-medium px-3 py-1.5 rounded transition-colors ${
                isActive('/profile')
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Profile
            </Link>

            {session?.user ? (
              <div className="flex items-center gap-3">
                {session.user.image && (
                  <Image 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700">
                  {session.user.name?.split(' ')[0] || session.user.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  className="text-xs"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link 
                href="/login"
                className={`text-sm font-medium px-3 py-1.5 rounded transition-colors ${
                  isActive('/login')
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Sign In
              </Link>
            )}

            {showNewSession && onNewSession && (
              <button 
                onClick={onNewSession}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors"
              >
                New Session
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}