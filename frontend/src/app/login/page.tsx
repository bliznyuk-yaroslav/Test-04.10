'use client';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import { loginThunk } from '../../store/slices/authSlice';
import AuthForm from '../../components/auth/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s: RootState) => s.auth);

  return (
    <AuthForm
      title="Login"
      submitLabel={loading ? 'Signing in...' : 'Sign in'}
      loading={loading}
      error={error}
      alternateText="Don’t have an account?"
      onSubmit={async ({ email, password }) => {
        try {
          await dispatch(loginThunk({ email, password })).unwrap();
          router.push('/kanban');
        } catch {}
      }}
      alternateLink={{ href: '/register', label: 'Register' }}
    />
  );
}
