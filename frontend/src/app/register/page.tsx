'use client';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';
import { registerThunk } from '../../store/slices/authSlice';
import AuthForm from '../../components/auth/AuthForm';


export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s: RootState) => s.auth);

  return (
    <AuthForm
      title="Register"
      submitLabel={loading ? 'Creating...' : 'Create account'}
      loading={loading}
      error={error}
      alternateText="Already have an account?"
      onSubmit={async ({ email, password }) => {
        try {
          await dispatch(registerThunk({ email, password })).unwrap();
          router.push('/kanban');
        } catch {}
      }}
      alternateLink={{ href: '/login', label: 'Login' }}
    />
  );
}
