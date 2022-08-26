import { useMemoizedFn } from 'ahooks';
import { Timeout } from 'ahooks/lib/useRequest/src/types';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import './index.css';

export default function App() {
  const [list, setList] = useState<string[]>([]);
  const [isRecord, setRecord] = useState(false);
  const touchRef = useRef<Timeout | null>(null);

  const [touchStartTimestamp, setTouchStartTimestamp] = useState(0);

  const onTouchStart = useMemoizedFn(() => {
    setList((pre) => [...pre, 'start']);

    setTouchStartTimestamp(dayjs().valueOf());
    touchRef.current = setTimeout(() => {
      setRecord(true);
    }, 500);
  });

  const onTouchEnd = useMemoizedFn(() => {
    setList((pre) => [...pre, 'end']);

    const diff = dayjs().valueOf() - touchStartTimestamp;

    if (diff < 500) {
      if (touchRef.current) {
        clearTimeout(touchRef.current);
        touchRef.current = null;
      }
    }
    setRecord(false);
    setTouchStartTimestamp(0);
  });

  document.body.onclick = () => {
    setList((pre) => [...pre, 'body']);
  };
  return (
    <div
      style={{
        userSelect: 'none',
      }}
      onClick={() => {
        setList((pre) => [...pre, 'click']);
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'black',
          opacity: isRecord ? 0.5 : 1,
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        长按
      </div>

      {!isRecord && (
        <div
          style={{
            marginTop: '10px',
            width: '80px',
            height: '80px',
            backgroundColor: 'pink',
          }}
          className="mt-8 w-20 h-20 bg-red-200"
          onClick={() => {
            alert(1111);
          }}
        >
          点击这个alert
        </div>
      )}

      <div
        style={{
          marginTop: '10px',
          width: '80px',
          height: '80px',
          backgroundColor: 'pink',
        }}
        onClick={() => {
          alert(222);
        }}
      >
        点击这个alert111
      </div>

      <div className="mt-3">
        {list.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
    </div>
  );
}
