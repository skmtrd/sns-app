import { signIn } from '../../auth';

const SignInButton = () => {
  return (
    <form
      className='rounded-xl p-3 ring-1 ring-slate-400'
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button type='submit'>ログイン</button>
    </form>
  );
};

export default SignInButton;
