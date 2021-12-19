import { Carousel, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import API from '../../API';
import styles from './story.module.css';

const api = new API();
const Story = () => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videosData, setVideosData] = useState(null);
  const [selectVideo, setSelectVideo] = useState(null);

  async function getData() {
    setLoading(true);
    await api.getVideoData().then((res) => setVideosData(res.videos));
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
    <div className="scrollmenu">
      {videosData &&
        videosData.map((item) => (
          <div className={styles.story_card}>
            <p>{item.title}</p>
            <img
              style={{ cursor: 'pointer' }}
              src={item.thumbnail_url}
              width={200}
              onClick={() => {
                setIsModalVisible(true);
                setSelectVideo(item.video_url);
              }}
              alt="img"
            />
          </div>
        ))}
      <Modal
        title="Video"
        visible={isModalVisible}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectVideo(null);
        }}
      >
        <Carousel dots={false} arrows>
          <video width={100} controls>
            <source src={selectVideo} type="video/mp4" />
          </video>
          {videosData
            .filter((item) => item.video_url !== selectVideo)
            .map((item) => (
              <video width={100} controls>
                <source src={item.video_url} type="video/mp4" />
              </video>
            ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default Story;
