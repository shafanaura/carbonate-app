import { CloseOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import API from '../../API';
import styles from './color.module.css';

const api = new API();
const Color = () => {
  const [loading, setLoading] = useState(false);
  const [colorData, setColorData] = useState(null);
  const [colorList, setColorList] = useState([]);
  console.log(colorList);

  async function getData() {
    setLoading(true);
    await api.getColorData().then((res) => setColorData(res));
    setLoading(false);
  }

  useEffect(() => {
    getData();
    return () => {
      getData();
    };
  }, []);

  return loading ? (
    <Spin />
  ) : (
    <div>
      {colorData &&
        colorData.map((item) => (
          <div className={styles.card}>
            <b>{item.name}</b>
            <div className={styles.box}>
              {item.values.map((color) => (
                <div
                  onClick={() => setColorList([...colorList, color.color])}
                  style={{ backgroundColor: color.color }}
                  className={styles.color_card}
                />
              ))}
            </div>
          </div>
        ))}
      <div className={styles.footer}>
        <div style={{ display: 'flex', gap: 12 }}>
          {colorList.map((color) => (
            <div
              onClick={() =>
                setColorList(colorList.filter((item) => item !== color))
              }
              style={{ backgroundColor: color }}
              className={styles.color_card}
            >
              <CloseOutlined />
            </div>
          ))}
        </div>
        <Button disabled={colorList.length !== 3} type="primary">
          Place
        </Button>
      </div>
    </div>
  );
};

export default Color;
