import localFont from 'next/font/local';
import Todo from '@/components/Todo';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}  p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="">
        <Todo />
      </main>
    </div>
  );
}
