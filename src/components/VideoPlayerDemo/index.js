import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaVideo, FaMusic, FaUpload, FaPlay, FaFileVideo, FaFileAudio } from 'react-icons/fa';
import VideoPlayer from '../VideoPlayer';
import { useTheme } from '../../contexts/ThemeContext';
import './VideoPlayerDemo.css';

const MediaPlayerDemo = () => {
  const { isDark } = useTheme();
  const [selectedMedia, setSelectedMedia] = useState({
    id: 1,
    title: "Big Buck Bunny - Open Source Movie",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    format: "MP4",
    type: "video",
    color: "#FF0000"
  }); // Default to first video
  const [mediaUrl, setMediaUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [mediaType, setMediaType] = useState('all'); // 'all', 'video', 'audio'

  // Sample media for demonstration
  const sampleMedia = [
    // Video samples
    {
      id: 1,
      title: "Big Buck Bunny - Open Source Movie",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      format: "MP4",
      type: "video",
      color: "#FF0000"
    },
    {
      id: 2,
      title: "Elephant Dream - Blender Movie",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
      format: "MP4",
      type: "video",
      color: "#1AB7EA"
    },
    {
      id: 3,
      title: "Sintel - Blender Movie",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
      format: "MP4",
      type: "video",
      color: "#6f42c1"
    },
    // Audio samples
    {
      id: 4,
      title: "Sample Audio Track",
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      poster: null,
      format: "WAV",
      type: "audio",
      color: "#ff5500"
    },
    {
      id: 5,
      title: "Nature Sounds",
      src: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
      poster: null,
      format: "MP3",
      type: "audio",
      color: "#1db954"
    },
    {
      id: 6,
      title: "MP3 Audio File",
      src: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      poster: null,
      format: "MP3",
      type: "audio",
      color: "#28a745"
    }
  ];

  // Supported media formats and platforms
  const supportedFormats = [
    // Video Streaming Platforms
    { format: 'YouTube', extension: 'youtube.com', description: 'World\'s largest video platform', category: 'Video Streaming', type: 'video' },
    { format: 'Vimeo', extension: 'vimeo.com', description: 'High-quality video hosting', category: 'Video Streaming', type: 'video' },
    { format: 'Twitch', extension: 'twitch.tv', description: 'Live streaming and VODs', category: 'Video Streaming', type: 'video' },
    { format: 'Dailymotion', extension: 'dailymotion.com', description: 'European video platform', category: 'Video Streaming', type: 'video' },
    { format: 'Wistia', extension: 'wistia.com', description: 'Business video hosting', category: 'Video Streaming', type: 'video' },
    { format: 'JW Player', extension: 'jwplatform.com', description: 'Professional video platform', category: 'Video Streaming', type: 'video' },
    
    // Audio Streaming Platforms
    { format: 'SoundCloud', extension: 'soundcloud.com', description: 'Audio sharing platform', category: 'Audio Streaming', type: 'audio' },
    { format: 'Spotify', extension: 'spotify.com', description: 'Music streaming service', category: 'Audio Streaming', type: 'audio' },
    { format: 'Bandcamp', extension: 'bandcamp.com', description: 'Independent music platform', category: 'Audio Streaming', type: 'audio' },
    
    // Video File Formats
    { format: 'MP4', extension: '.mp4', description: 'Most widely supported video format', category: 'Video Files', type: 'video' },
    { format: 'WebM', extension: '.webm', description: 'Open web standard, great compression', category: 'Video Files', type: 'video' },
    { format: 'OGG', extension: '.ogg', description: 'Open source video format', category: 'Video Files', type: 'video' },
    { format: 'MOV', extension: '.mov', description: 'QuickTime format', category: 'Video Files', type: 'video' },
    { format: 'AVI', extension: '.avi', description: 'Audio Video Interleave', category: 'Video Files', type: 'video' },
    { format: 'MKV', extension: '.mkv', description: 'Matroska multimedia container', category: 'Video Files', type: 'video' },
    { format: 'M4V', extension: '.m4v', description: 'iTunes compatible format', category: 'Video Files', type: 'video' },
    { format: 'FLV', extension: '.flv', description: 'Flash video format', category: 'Video Files', type: 'video' },
    { format: '3GP', extension: '.3gp', description: 'Mobile video format', category: 'Video Files', type: 'video' },
    { format: 'WMV', extension: '.wmv', description: 'Windows Media Video', category: 'Video Files', type: 'video' },
    
    // Audio File Formats
    { format: 'MP3', extension: '.mp3', description: 'Most widely supported audio format', category: 'Audio Files', type: 'audio' },
    { format: 'WAV', extension: '.wav', description: 'Uncompressed audio format', category: 'Audio Files', type: 'audio' },
    { format: 'FLAC', extension: '.flac', description: 'Lossless audio compression', category: 'Audio Files', type: 'audio' },
    { format: 'AAC', extension: '.aac', description: 'Advanced Audio Coding', category: 'Audio Files', type: 'audio' },
    { format: 'M4A', extension: '.m4a', description: 'MPEG-4 Audio', category: 'Audio Files', type: 'audio' },
    { format: 'OGA', extension: '.oga', description: 'Ogg audio format', category: 'Audio Files', type: 'audio' },
    { format: 'WMA', extension: '.wma', description: 'Windows Media Audio', category: 'Audio Files', type: 'audio' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('video/') ? 'video' : 'audio';
      setSelectedMedia({
        id: 'uploaded',
        title: file.name,
        src: url,
        format: file.name.split('.').pop().toUpperCase(),
        type: type
      });
      setShowUrlInput(false);
    } else {
      alert('Please select a valid video or audio file');
    }
  };

  const handleUrlSubmit = () => {
    if (mediaUrl.trim()) {
      const format = mediaUrl.split('.').pop().toUpperCase();
      const type = detectMediaType(mediaUrl);
      setSelectedMedia({
        id: 'url',
        title: `Media from URL`,
        src: mediaUrl,
        format: format,
        type: type
      });
      setMediaUrl('');
      setShowUrlInput(false);
    }
  };

  const detectMediaType = (url) => {
    const audioExtensions = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'oga', 'wma'];
    const videoPlatforms = ['youtube', 'vimeo', 'twitch', 'dailymotion'];
    const audioPlatforms = ['soundcloud', 'spotify', 'bandcamp'];
    
    if (audioPlatforms.some(platform => url.includes(platform))) return 'audio';
    if (videoPlatforms.some(platform => url.includes(platform))) return 'video';
    
    const extension = url.split('.').pop().toLowerCase();
    return audioExtensions.includes(extension) ? 'audio' : 'video';
  };

  const selectSampleMedia = (media) => {
    setSelectedMedia(media);
    setShowUrlInput(false);
  };

  const filteredMedia = mediaType === 'all' ? sampleMedia : sampleMedia.filter(media => media.type === mediaType);

  return (
    <Container fluid className="py-5 video-player-demo-container">
      {/* Header */}
      <Row className="mb-5">
        <Col lg={12} className="text-center">
          <div className={`hero-section ${isDark ? 'dark' : 'light'}`}>
            <div className="hero-icons mb-3">
              <FaVideo className="hero-icon" />
              <FaMusic className="hero-icon ml-3" />
            </div>
            <h1 className="display-4 fw-bold mb-3">
              <span className="gradient-text">Universal Media Player</span>
            </h1>
            <p className="lead">
              Professional media player supporting all popular video and audio formats
            </p>
          </div>
        </Col>
      </Row>

      {/* Media Player Section */}
      <Row className="mb-5">
        <Col lg={12} xl={12} className="mx-auto">
          <Card className={`video-demo-card ${isDark ? 'dark' : 'light'}`}>
            <Card.Body>
              {selectedMedia ? (
                <div className="video-container">
                  <VideoPlayer
                    src={selectedMedia.src}
                    poster={selectedMedia.poster}
                    title={selectedMedia.title}
                    width="100%"
                    height="auto"
                    controls={true}
                    showDownload={true}
                    onTimeUpdate={(time) => console.log('Time:', time)}
                    onEnded={() => console.log('Media ended')}
                  />
                  <div className="video-info mt-3">
                    <h5>{selectedMedia.title}</h5>
                    <p className="text-muted">
                      Format: {selectedMedia.format} | Type: {selectedMedia.type}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="video-placeholder">
                  <div className="placeholder-icons">
                    <FaFileVideo className="placeholder-icon" />
                    <FaFileAudio className="placeholder-icon ml-3" />
                  </div>
                  <h4>Select media to play</h4>
                  <p>Choose from sample videos/audio, upload your own, or enter a media URL</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Media Selection */}
      <Row className="mb-5">
        <Col lg={12} xl={12} className="mx-auto">
          <Card className={`selection-card ${isDark ? 'dark' : 'light'}`}>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <FaPlay className="me-2" />
                  Media Selection
                </h4>
                <div className="media-type-filter">
                  <Button 
                    variant={mediaType === 'all' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setMediaType('all')}
                    className="me-2"
                  >
                    All
                  </Button>
                  <Button 
                    variant={mediaType === 'video' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setMediaType('video')}
                    className="me-2"
                  >
                    <FaVideo className="me-1" />
                    Video
                  </Button>
                  <Button 
                    variant={mediaType === 'audio' ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setMediaType('audio')}
                  >
                    <FaMusic className="me-1" />
                    Audio
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Upload and URL Options */}
              <Row className="mb-4">
                <Col md={6}>
                  <div className="upload-section">
                    <label htmlFor="media-upload" className="upload-btn">
                      <FaUpload className="me-2" />
                      Upload Media File
                    </label>
                    <input
                      id="media-upload"
                      type="file"
                      accept="video/*,audio/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <small className="text-muted d-block mt-2">
                      Supports all major video and audio formats
                    </small>
                  </div>
                </Col>
                <Col md={6}>
                  <Button 
                    variant="outline-primary"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="url-btn"
                  >
                    Enter Media URL
                  </Button>
                  {showUrlInput && (
                    <div className="url-input mt-3">
                      <Form.Control
                        type="url"
                        placeholder="https://example.com/media.mp4"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        className="mb-2"
                      />
                      <Button variant="primary" onClick={handleUrlSubmit}>
                        Load Media
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>

              {/* Sample Media */}
              <h5 className="mb-3">Sample Media</h5>
              <Row>
                {filteredMedia.map((media) => (
                  <Col md={4} key={media.id} className="mb-3">
                    <Card 
                      className={`sample-video-card ${isDark ? 'dark' : 'light'} ${selectedMedia?.id === media.id ? 'selected' : ''}`}
                      onClick={() => selectSampleMedia(media)}
                    >
                      <div className="video-thumbnail">
                        <div 
                          className="video-thumbnail-placeholder"
                          style={{ backgroundColor: media.color }}
                        >
                          <div className="thumbnail-content">
                            {media.type === 'video' ? <FaVideo className="thumbnail-icon" /> : <FaMusic className="thumbnail-icon" />}
                            <span className="thumbnail-text">{media.format} {media.type}</span>
                          </div>
                        </div>
                        <div className="play-overlay">
                          <FaPlay />
                        </div>
                      </div>
                      <Card.Body>
                        <h6>{media.title}</h6>
                        <small className="text-muted">{media.format} • {media.type}</small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Supported Formats */}
      <Row>
        <Col lg={11} xl={10} className="mx-auto">
          <Card className={`formats-card ${isDark ? 'dark' : 'light'}`}>
            <Card.Header>
              <h4 className="mb-0">
                <FaFileVideo className="me-2" />
                Supported Platforms & Formats
              </h4>
            </Card.Header>
            <Card.Body>
              {/* Video Streaming Platforms */}
              <div className="format-category mb-4">
                <h5 className="category-title">� Video Streaming Platforms</h5>
                <Row>
                  {supportedFormats.filter(f => f.category === 'Video Streaming').map((format, index) => (
                    <Col md={6} lg={4} key={index} className="mb-3">
                      <div className="format-item streaming">
                        <div className="format-header">
                          <strong>{format.format}</strong>
                          <span className="format-extension streaming">{format.extension}</span>
                        </div>
                        <p className="format-description">{format.description}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Audio Streaming Platforms */}
              <div className="format-category mb-4">
                <h5 className="category-title">🎵 Audio Streaming Platforms</h5>
                <Row>
                  {supportedFormats.filter(f => f.category === 'Audio Streaming').map((format, index) => (
                    <Col md={6} lg={4} key={index} className="mb-3">
                      <div className="format-item streaming audio">
                        <div className="format-header">
                          <strong>{format.format}</strong>
                          <span className="format-extension audio">{format.extension}</span>
                        </div>
                        <p className="format-description">{format.description}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Video Files */}
              <div className="format-category mb-4">
                <h5 className="category-title">� Video File Formats</h5>
                <Row>
                  {supportedFormats.filter(f => f.category === 'Video Files').map((format, index) => (
                    <Col md={6} lg={4} key={index} className="mb-3">
                      <div className="format-item direct">
                        <div className="format-header">
                          <strong>{format.format}</strong>
                          <span className="format-extension direct">{format.extension}</span>
                        </div>
                        <p className="format-description">{format.description}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Audio Files */}
              <div className="format-category">
                <h5 className="category-title">🎧 Audio File Formats</h5>
                <Row>
                  {supportedFormats.filter(f => f.category === 'Audio Files').map((format, index) => (
                    <Col md={6} lg={4} key={index} className="mb-3">
                      <div className="format-item direct audio">
                        <div className="format-header">
                          <strong>{format.format}</strong>
                          <span className="format-extension audio">{format.extension}</span>
                        </div>
                        <p className="format-description">{format.description}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              
              <Alert variant="info" className="mt-4">
                <strong>🎯 Pro Tip:</strong> Simply paste any YouTube, Vimeo, SoundCloud, Spotify, or other supported platform URL, and our media player will automatically detect and embed it with full functionality!
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features List */}
      <Row className="mt-5">
        <Col lg={11} xl={10} className="mx-auto">
          <Card className={`features-card ${isDark ? 'dark' : 'light'}`}>
            <Card.Header>
              <h4 className="mb-0">Player Features</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <ul className="feature-list">
                    <li>🎬 YouTube & Vimeo embedding</li>
                    <li>� Twitch & Dailymotion support</li>
                    <li>✨ Auto-platform detection</li>
                    <li>🔄 Play/Pause controls</li>
                    <li>⏩ Skip forward/backward (10s)</li>
                    <li>� Volume control with mute</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="feature-list">
                    <li>🎯 Fullscreen mode</li>
                    <li>⚡ Variable playback speed</li>
                    <li>📊 Progress bar with scrubbing</li>
                    <li>⏰ Time display</li>
                    <li>💾 Download functionality</li>
                    <li>� Light/Dark theme support</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MediaPlayerDemo;