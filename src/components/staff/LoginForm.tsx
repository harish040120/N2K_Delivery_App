import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { supabase } from '../../lib/supabase';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass: string) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasSpecialChar = /[!@#$%^&*]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasMinLength = pass.length >= 8;

    return hasUpperCase && hasSpecialChar && hasNumber && hasMinLength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password must contain at least 8 characters, one uppercase letter, one number, and one special character.');
      return;
    }

    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: `${staffId}@n2klogistics.com`,
        password,
      });

      if (signInError) throw signInError;

      navigate('/staff/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <Input
        label="Staff ID"
        placeholder="Enter your staff ID"
        value={staffId}
        onChange={(e) => setStaffId(e.target.value)}
        icon={<User className="h-5 w-5 text-gray-400" />}
        required
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock className="h-5 w-5 text-gray-400" />}
        error={error}
        required
      />
      <Button
        type="submit"
        className="w-full"
        loading={loading}
        disabled={!staffId || !password}
      >
        Sign In
      </Button>
    </form>
  );
};