import { Metadata } from 'next';
import AuthClientWrapper from '@/components/auth/AuthClientWrapper';

export const metadata: Metadata = {
  title: 'Sign In / Register | Kitchora',
  description: 'Sign in to access your saved orders, cooking wishlist, and verified addresses.',
};

export default function AuthPage() {
  return (
    <div className="bg-surface">
      <AuthClientWrapper />
    </div>
  );
}
