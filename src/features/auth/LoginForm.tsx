import { useState, FormEvent } from 'react';
import { useNavigate, Form } from 'react-router-dom';
import Button from '../../ui/Button';
import { useAuth } from '../../services/useAuth';
const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("username", email);  
    formData.append("password", password);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: formData, // FormData is automatically encoded as 'multipart/form-data'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData?.detail || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Store the token in localStorage
      localStorage.setItem('fastaccessToken', data.access_token);
      login(data.access_token);
      // Navigate to another page after successful login
      navigate('/');
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
      <h1 className='text-center mt-32 mb-16 uppercase text-xl text-stone-500 md:text-3xl'>Log In</h1>
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
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
