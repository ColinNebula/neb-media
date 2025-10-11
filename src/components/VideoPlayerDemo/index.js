import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Accordion } from 'react-bootstrap';
import { FaVideo, FaMusic, FaUpload, FaPlay, FaFileVideo, FaFileAudio } from 'react-icons/fa';
import VideoPlayer from '../VideoPlayer';
import { useTheme } from '../../contexts/ThemeContext';
import './VideoPlayerDemo.css';
import BgVideo from '../../assets/videos/bg.mp4';
import BgVideo1 from '../../assets/videos/bg1.mp4';

const MediaPlayerDemo = () => {
  const { isDark } = useTheme();
  const [selectedMedia, setSelectedMedia] = useState({
    id: 1,
    title: "Nebula3D Dev - Background Video",
    src: BgVideo,
    poster: null,
    format: "MP4",
    type: "video",
    color: "#667eea"
  }); // Default to first video
  const [mediaUrl, setMediaUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [mediaType, setMediaType] = useState('all'); // 'all', 'video', 'audio'

  // Sample media for demonstration
  const sampleMedia = [
    // Video samples - Our videos
    {
      id: 1,
      title: "Nebula3D Dev - Background Video",
      src: BgVideo,
      poster: null,
      format: "MP4",
      type: "video",
      color: "#667eea"
    },
    {
      id: 2,
      title: "Nebula3D Dev - Background Video 2",
      src: BgVideo1,
      poster: null,
      format: "MP4",
      type: "video",
      color: "#764ba2"
    },
    {
      id: 3,
      title: "E-Commerce Platform - Nebula3D Dev",
      src: "https://www.youtube.com/watch?v=N2WhwHaicR4",
      poster: null,
      format: "YouTube",
      type: "video",
      color: "#FF0000"
    },
    {
      id: 4,
      title: "SaaS Dashboard - Nebula3D Dev",
      src: "https://www.youtube.com/watch?v=1wI6aDte_1Q",
      poster: null,
      format: "YouTube",
      type: "video",
      color: "#FF6B6B"
    },
    {
      id: 5,
      title: "Big Buck Bunny - Demo",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
      format: "MP4",
      type: "video",
      color: "#00B3E6"
    },
    {
      id: 6,
      title: "Sintel - Blender Short Film",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
      format: "MP4",
      type: "video",
      color: "#4facfe"
    },
    // Audio samples
    {
      id: 7,
      title: "Sample Audio Track",
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      poster: null,
      format: "WAV",
      type: "audio",
      color: "#ff5500"
    },
    {
      id: 8,
      title: "Nature Sounds",
      src: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
      poster: null,
      format: "MP3",
      type: "audio",
      color: "#1db954"
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
            <h1 className="display-4 fw-bold mb-3">
              <span className="gradient-text">Universal Media Player</span>
            </h1>
            <p className="lead">
              Professional media player supporting all popular video and audio formats
            </p>
          </div>
        </Col>
      </Row>

      {/* Sidebar Layout - Media Selection & Player */}
      <Row className="mb-5">
        {/* Sidebar - Media Library */}
        <Col lg={4} xl={3} className="mb-4 mb-lg-0">
          <Card className={`media-sidebar ${isDark ? 'dark' : 'light'}`}>
            <Card.Header className="sidebar-header">
              <h5 className="mb-3">
                <FaPlay className="me-2" />
                Media Library
              </h5>
              <div className="media-type-filter-vertical">
                <Button 
                  variant={mediaType === 'all' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setMediaType('all')}
                  className="w-100 mb-2"
                >
                  All Media
                </Button>
                <Button 
                  variant={mediaType === 'video' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setMediaType('video')}
                  className="w-100 mb-2"
                >
                  <FaVideo className="me-2" />
                  Videos
                </Button>
                <Button 
                  variant={mediaType === 'audio' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setMediaType('audio')}
                  className="w-100"
                >
                  <FaMusic className="me-2" />
                  Audio
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="sidebar-body">
              {/* Upload Options */}
              <div className="sidebar-section mb-3">
                <h6 className="sidebar-section-title">Add Media</h6>
                <label htmlFor="media-upload" className="sidebar-upload-btn">
                  <FaUpload className="me-2" />
                  Upload File
                </label>
                <input
                  id="media-upload"
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <Button 
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="w-100 mt-2"
                >
                  Enter URL
                </Button>
                {showUrlInput && (
                  <div className="url-input-sidebar mt-2">
                    <Form.Control
                      type="url"
                      placeholder="Media URL..."
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      size="sm"
                      className="mb-2"
                    />
                    <Button size="sm" variant="primary" onClick={handleUrlSubmit} className="w-100">
                      Load
                    </Button>
                  </div>
                )}
              </div>

              {/* Sample Media List */}
              <div className="sidebar-section">
                <h6 className="sidebar-section-title">Sample Media ({filteredMedia.length})</h6>
                <div className="media-list">
                  {filteredMedia.map((media) => (
                    <div 
                      key={media.id}
                      className={`media-list-item ${selectedMedia?.id === media.id ? 'active' : ''}`}
                      onClick={() => selectSampleMedia(media)}
                    >
                      <div className="media-icon" style={{ color: media.color }}>
                        {media.type === 'video' ? <FaVideo /> : <FaMusic />}
                      </div>
                      <div className="media-details">
                        <div className="media-name">{media.title}</div>
                        <div className="media-meta">
                          <span className="media-type-badge">{media.type}</span>
                          <span className="media-format-badge">{media.format}</span>
                        </div>
                      </div>
                      {selectedMedia?.id === media.id && (
                        <div className="playing-indicator">
                          <FaPlay />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Player Area */}
        <Col lg={8} xl={9}>
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
                    theme="modern"
                    mediaType={selectedMedia.type}
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
                  <p>Choose from the media library or upload your own</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Supported Formats - Commented out for now */}
      {/* <Row>
        <Col lg={11} xl={10} className="mx-auto">
          <Card className={`formats-card ${isDark ? 'dark' : 'light'}`}>
            <Card.Header>
              <h4 className="mb-0">
                <FaFileVideo className="me-2" />
                Supported Platforms & Formats
              </h4>
            </Card.Header>
            <Card.Body>
              <Accordion defaultActiveKey="0" className="formats-accordion">
                <Accordion.Item eventKey="0" className="accordion-item-custom">
                  <Accordion.Header className="accordion-header-custom">
                    <span className="accordion-icon">🎬</span>
                    <span className="accordion-title">Video Streaming Platforms</span>
                    <span className="accordion-count">{supportedFormats.filter(f => f.category === 'Video Streaming').length} platforms</span>
                  </Accordion.Header>
                  <Accordion.Body className="accordion-body-custom">
                    <div className="format-grid">
                      {supportedFormats.filter(f => f.category === 'Video Streaming').map((format, index) => (
                        <div key={index} className="format-card streaming">
                          <div className="format-card-header">
                            <FaVideo className="format-card-icon" />
                            <strong>{format.format}</strong>
                          </div>
                          <code className="format-extension">{format.extension}</code>
                          <p className="format-description">{format.description}</p>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" className="accordion-item-custom">
                  <Accordion.Header className="accordion-header-custom">
                    <span className="accordion-icon">🎵</span>
                    <span className="accordion-title">Audio Streaming Platforms</span>
                    <span className="accordion-count">{supportedFormats.filter(f => f.category === 'Audio Streaming').length} platforms</span>
                  </Accordion.Header>
                  <Accordion.Body className="accordion-body-custom">
                    <div className="format-grid">
                      {supportedFormats.filter(f => f.category === 'Audio Streaming').map((format, index) => (
                        <div key={index} className="format-card audio-streaming">
                          <div className="format-card-header">
                            <FaMusic className="format-card-icon" />
                            <strong>{format.format}</strong>
                          </div>
                          <code className="format-extension">{format.extension}</code>
                          <p className="format-description">{format.description}</p>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2" className="accordion-item-custom">
                  <Accordion.Header className="accordion-header-custom">
                    <span className="accordion-icon">📹</span>
                    <span className="accordion-title">Video File Formats</span>
                    <span className="accordion-count">{supportedFormats.filter(f => f.category === 'Video Files').length} formats</span>
                  </Accordion.Header>
                  <Accordion.Body className="accordion-body-custom">
                    <div className="format-grid">
                      {supportedFormats.filter(f => f.category === 'Video Files').map((format, index) => (
                        <div key={index} className="format-card video-file">
                          <div className="format-card-header">
                            <FaFileVideo className="format-card-icon" />
                            <strong>{format.format}</strong>
                          </div>
                          <code className="format-extension">{format.extension}</code>
                          <p className="format-description">{format.description}</p>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3" className="accordion-item-custom">
                  <Accordion.Header className="accordion-header-custom">
                    <span className="accordion-icon">🎧</span>
                    <span className="accordion-title">Audio File Formats</span>
                    <span className="accordion-count">{supportedFormats.filter(f => f.category === 'Audio Files').length} formats</span>
                  </Accordion.Header>
                  <Accordion.Body className="accordion-body-custom">
                    <div className="format-grid">
                      {supportedFormats.filter(f => f.category === 'Audio Files').map((format, index) => (
                        <div key={index} className="format-card audio-file">
                          <div className="format-card-header">
                            <FaFileAudio className="format-card-icon" />
                            <strong>{format.format}</strong>
                          </div>
                          <code className="format-extension">{format.extension}</code>
                          <p className="format-description">{format.description}</p>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
              <Alert variant="info" className="mt-4">
                <strong>🎯 Pro Tip:</strong> Simply paste any YouTube, Vimeo, SoundCloud, Spotify, or other supported platform URL, and our media player will automatically detect and embed it with full functionality!
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};

export default MediaPlayerDemo;