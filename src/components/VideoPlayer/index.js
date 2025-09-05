import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaExpand, 
  FaCompress,
  FaForward,
  FaBackward,
  FaCog,
  FaClosedCaptioning,
  FaDownload
} from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const VideoPlayer = ({ 
  src, 
  poster, 
  title = "Video Player",
  width = "100%",
  height = "auto",
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  showDownload = true,
  subtitles = null,
  onTimeUpdate = null,
  onEnded = null,
  className = ""
}) => {
  const { isDark } = useTheme();
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState(null);

  // Video format detection and support
  const getSupportedFormats = () => {
    const video = document.createElement('video');
    const formats = {
      mp4: video.canPlayType('video/mp4; codecs="avc1.42E01E"'),
      webm: video.canPlayType('video/webm; codecs="vp8, vorbis"'),
      ogg: video.canPlayType('video/ogg; codecs="theora"'),
      mov: video.canPlayType('video/quicktime'),
      avi: video.canPlayType('video/x-msvideo'),
      mkv: video.canPlayType('video/x-matroska'),
      m4v: video.canPlayType('video/x-m4v'),
      flv: video.canPlayType('video/x-flv'),
      '3gp': video.canPlayType('video/3gpp'),
      wmv: video.canPlayType('video/x-ms-wmv')
    };
    return formats;
  };

  // Format video time to MM:SS or HH:MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      if (onTimeUpdate) onTimeUpdate(current);
    }
  };

  // Handle duration change
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
      if (newMuted) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = volume;
      }
    }
  };

  // Skip forward/backward
  const skipTime = (seconds) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Change playback rate
  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowSettings(false);
  };

  // Download video
  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = title || 'video';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };
    const handleError = () => setError("Failed to load video");
    const handleCanPlay = () => setIsLoading(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  return (
    <div 
      className={`video-player ${isDark ? 'dark' : 'light'} ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        className="video-element"
        onClick={togglePlay}
      >
        <source src={src} type={`video/${src.split('.').pop()}`} />
        {subtitles && (
          <track
            kind="subtitles"
            src={subtitles}
            srcLang="en"
            label="English"
            default
          />
        )}
        Your browser does not support the video tag.
      </video>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="video-loading">
          <div className="loading-spinner"></div>
          <p>Loading video...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="video-error">
          <p>{error}</p>
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && (
        <div className="play-overlay" onClick={togglePlay}>
          <div className="play-button-large">
            <FaPlay />
          </div>
        </div>
      )}

      {/* Video Controls */}
      {controls && (
        <div className={`video-controls ${showControls ? 'visible' : 'hidden'}`}>
          {/* Progress Bar */}
          <div className="progress-container">
            <div 
              ref={progressRef}
              className="progress-bar"
              onClick={handleProgressClick}
            >
              <div 
                className="progress-filled"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
              <div 
                className="progress-handle"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="controls-row">
            <div className="controls-left">
              {/* Play/Pause */}
              <button className="control-btn" onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              {/* Skip Backward */}
              <button className="control-btn" onClick={() => skipTime(-10)}>
                <FaBackward />
              </button>

              {/* Skip Forward */}
              <button className="control-btn" onClick={() => skipTime(10)}>
                <FaForward />
              </button>

              {/* Volume */}
              <div className="volume-container">
                <button className="control-btn" onClick={toggleMute}>
                  {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input
                  ref={volumeRef}
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>

              {/* Time Display */}
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span> / </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="controls-right">
              {/* Download Button */}
              {showDownload && (
                <button className="control-btn" onClick={downloadVideo} title="Download Video">
                  <FaDownload />
                </button>
              )}

              {/* Settings */}
              <div className="settings-container">
                <button 
                  className="control-btn" 
                  onClick={() => setShowSettings(!showSettings)}
                  title="Settings"
                >
                  <FaCog />
                </button>
                
                {showSettings && (
                  <div className="settings-menu">
                    <div className="settings-section">
                      <h4>Playback Speed</h4>
                      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(rate => (
                        <button
                          key={rate}
                          className={`settings-option ${playbackRate === rate ? 'active' : ''}`}
                          onClick={() => changePlaybackRate(rate)}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button className="control-btn" onClick={toggleFullscreen} title="Fullscreen">
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Title */}
      {title && (
        <div className="video-title">
          <h3>{title}</h3>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;