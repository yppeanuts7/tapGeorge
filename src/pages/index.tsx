import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [clickCount, setClickCount] = useState<number | null>(null);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isScared, setIsScared] = useState(false);

  /** 初回読み込みで visitor を加算 */
  useEffect(() => {
    const fetchCounts = async () => {
      const [visitorRes, clickRes] = await Promise.all([
        fetch('/api/visitor', { method: 'POST' }),
        fetch('/api/click', { method: 'GET' }),
      ]);

      const visitorData = await visitorRes.json();
      const clickData = await clickRes.json();

      setVisitorCount(visitorData.count);
      setClickCount(clickData.count);
    };

    fetchCounts();
  }, []);

  /** 通常 → びっくりへの切り替え */
  const handleClick = async () => {
    setIsScared(true);
    /** 3秒後に画像を元に戻す */
    setTimeout(() => setIsScared(false), 300);
    const res = await fetch('/api/click', { method: 'POST' });
    const data = await res.json();
    setClickCount(data.count);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black select-none px-4 sm:px-8">

      <header className="w-full p-4 flex justify-between items-center shadow-md fixed top-0 bg-white z-10">
        <div className="flex items-center space-x-2">
          <img
            src="/ジョージ顔.png"
            alt="ジョージの顔"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          <h1 className="text-lg sm:text-xl font-bold">ジョージを驚かせよう</h1>
        </div>
        <div className="text-xs sm:text-sm text-gray-600">
          来場者数：{visitorCount ?? '...'} 人
        </div>
      </header>

      {/** ヘッダー固定のため、マージントップはヘッダーの高さ＋余白を確保 */}
      {/** 画像を下に配置するためz-10 */}
      <div className="mt-20 sm:mt-24 text-xl sm:text-2xl mb-4 font-semibold text-center z-10">
        ジョージを驚かせた回数：{clickCount ?? '...'} 回
      </div>

      {/** スマホ用サイズ z-0 */}
      <div onClick={handleClick} className="cursor-pointer z-0">
        <Image
          src={isScared ? '/びっくりジョージ.png' : '/ジョージ.png'}
          alt="ジョージ"
          width={250}
          height={250}
          className={`transition-transform duration-150 ${
            isScared ? 'scale-125' : 'scale-100'
          } animate-wobble`}
          priority
        />
      </div>

      <div className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded-xl shadow-md text-center max-w-xs z-10 mt-10">
        ジョージをタップして<br />
        びっくりさせてみよう✨
      </div>

    </main>
  );
}
