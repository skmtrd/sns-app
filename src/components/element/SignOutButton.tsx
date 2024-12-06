import { signOut } from '../../../auth';

const SignOutButton = () => {
  return (
    <form
      className='grid place-items-center rounded-xl p-3 ring-1 ring-slate-400'
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type='submit'>ログアウト</button>
    </form>
  );
};

export default SignOutButton;
