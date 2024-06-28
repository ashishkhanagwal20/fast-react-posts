import { useState, FormEvent } from 'react';
import { useNavigate, Form } from 'react-router-dom';
import Button from '../../ui/Button';

const SignupForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = {
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData?.detail[0]['msg'] || 'Signup failed');
      }

      const data = await response.json();
      console.log('Signup successful:', data);

      // Navigate to login page or any other page after successful signup
      navigate('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1 className='text-center mt-32 mb-16 uppercase text-xl text-stone-500 md:text-3xl'>Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Form method="post" onSubmit={handleSubmit}>
        <div className="mb-5 mt-20 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input grow"
            placeholder="email"
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input grow"
            placeholder="password"
          />
        </div>
        <Button disabled={false} type="primary">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
