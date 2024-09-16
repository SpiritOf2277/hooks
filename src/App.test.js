import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/register', data);
      console.log('User registered successfully:', response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>User Registration</h2>

      <label>
        Login:
        <input
          type="text"
          {...register('login', {
            required: 'Login is required',
            minLength: {
              value: 4,
              message: 'Login must be at least 4 characters',
            },
          })}
        />
        {errors.login && touchedFields.login && (
          <p style={{ color: 'red' }}>{errors.login.message}</p>
        )}
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && touchedFields.password && (
          <p style={{ color: 'red' }}>{errors.password.message}</p>
        )}
      </label>
      <br />

      <label>
        Confirm Password:
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Password confirmation is required',
            validate: (value, data) =>
              value === data.password || 'Passwords do not match',
          })}
        />
        {errors.confirmPassword && touchedFields.confirmPassword && (
          <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
        )}
      </label>
      <br />

      <label>
        Role:
        <select {...register('role')}>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
      </label>
      <br />

      <label>
        Gender:
        <label>
          <input
            type="radio"
            value="male"
            {...register('gender', { required: 'Gender is required' })}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            {...register('gender', { required: 'Gender is required' })}
          />
          Female
        </label>
        {errors.gender && touchedFields.gender && (
          <p style={{ color: 'red' }}>{errors.gender.message}</p>
        )}
      </label>
      <br />
      
      <label>
        Status:
        <input type="checkbox" {...register('status')} />
        Enabled
      </label>
      <br />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
