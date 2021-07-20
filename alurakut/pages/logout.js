import { useRouter } from 'next/router';
import nookies from 'nookies';

function RedirectPage({ ctx }) {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    router.push('/login');
    return;
  }
}

RedirectPage.getInitialProps = (ctx) => {
  if (ctx.res) {
    nookies.destroy(null, 'USER_TOKEN', {
      path: '/',
    });
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
  }
  return {};
};

export default RedirectPage;
