import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import './index.css';

export default () => {
  const gotoTestB = () => {
    Router.push({
      pathname: '/b',
      query: {
        id: 2,
      }
    });
  }

  return (
    <>
      <Link href="/a?id=1" title="Hello">
        <Button>Hello World</Button>
      </Link>
      <Button onClick={gotoTestB}>goToB</Button>
    </>
  )
};
