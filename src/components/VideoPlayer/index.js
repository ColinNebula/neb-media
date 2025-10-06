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
  FaDownload,
  FaYoutube,
  FaVimeo,
  FaTwitch,
  FaExternalLinkAlt,
  FaMusic,
  FaVideo,
  FaHeadphones,
  FaSoundcloud,
  FaSpotify,
  FaRandom,
  FaRedo,
  FaStepForward,
  FaStepBackward
} from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import './VideoPlayer.css';

const MediaPlayer = ({ 
  src, 
  poster, 
  title = "Media Player",
  type = "auto", // auto, video, audio
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
  className = "",
  playlist = null,
  currentIndex = 0,
  onPlaylistChange = null,
  showEqualizer = true,
  showWaveform = true,
  crossfade = true,
  showLyrics = false
}) => {
  const { isDark } = useTheme();
  const mediaRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const iframeRef = useRef(null);
  
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
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [platform, setPlatform] = useState(null);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [mediaType, setMediaType] = useState('video');
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('none'); // none, one, all
  const [visualizer, setVisualizer] = useState(false);

  // Enhanced features
  const [showEq, setShowEq] = useState(false);
  const [eqBands, setEqBands] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 10-band EQ
  const [bassBoost, setBassBoost] = useState(0);
  const [trebleBoost, setTrebleBoost] = useState(0);
  const [showWaveformViz, setShowWaveformViz] = useState(false);
  const [crossfadeEnabled, setCrossfadeEnabled] = useState(crossfade);
  const [crossfadeDuration, setCrossfadeDuration] = useState(3);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [showLyricsPanel, setShowLyricsPanel] = useState(false);
  const [currentLyrics, setCurrentLyrics] = useState('');
  const [pitchShift, setPitchShift] = useState(0);
  const [tempoShift, setTempoShift] = useState(0);
  const [showSpectrum, setShowSpectrum] = useState(false);
  const [showPlaylistPanel, setShowPlaylistPanel] = useState(false);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  
  // Audio analysis
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const frequencyDataRef = useRef(null);
  const waveformDataRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodesRef = useRef([]);
  const animationFrameRef = useRef(null);

  // Media type detection
  const detectMediaType = (url, typeHint = "auto") => {
    if (typeHint !== "auto") return typeHint;
    
    if (!url) return 'video';
    
    const audioExtensions = /\.(mp3|wav|ogg|aac|flac|m4a|opus|wma)$/i;
    const videoExtensions = /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv|m4v)$/i;
    
    if (audioExtensions.test(url)) return 'audio';
    if (videoExtensions.test(url)) return 'video';
    
    // Check for audio streaming platforms
    if (url.includes('soundcloud.com') || url.includes('spotify.com') || 
        url.includes('bandcamp.com') || url.includes('mixcloud.com')) {
      return 'audio';
    }
    
    // Default to video for unknown types and streaming platforms
    return 'video';
  };

  // Platform detection and URL parsing
  const detectPlatform = (url) => {
    if (!url) return { platform: null, embedUrl: null, isEmbedded: false };

    // SoundCloud detection
    const soundcloudRegex = /(?:soundcloud\.com\/)([A-Za-z0-9\-_\/]+)/;
    const soundcloudMatch = url.match(soundcloudRegex);
    if (soundcloudMatch) {
      return {
        platform: 'soundcloud',
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`,
        isEmbedded: true,
        mediaType: 'audio'
      };
    }

    // Spotify detection
    const spotifyRegex = /(?:spotify\.com\/(?:track|album|playlist)\/|spotify:(?:track|album|playlist):)([A-Za-z0-9]+)/;
    const spotifyMatch = url.match(spotifyRegex);
    if (spotifyMatch) {
      const itemId = spotifyMatch[1];
      const itemType = url.includes('track') ? 'track' : url.includes('album') ? 'album' : 'playlist';
      return {
        platform: 'spotify',
        embedUrl: `https://open.spotify.com/embed/${itemType}/${itemId}`,
        isEmbedded: true,
        mediaType: 'audio'
      };
    }

    // Bandcamp detection
    const bandcampRegex = /([A-Za-z0-9\-_]+\.bandcamp\.com)/;
    const bandcampMatch = url.match(bandcampRegex);
    if (bandcampMatch) {
      return {
        platform: 'bandcamp',
        embedUrl: url,
        isEmbedded: true,
        mediaType: 'audio'
      };
    }

    // YouTube detection (supports both video and audio)
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return {
        platform: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`,
        isEmbedded: true,
        mediaType: 'video'
      };
    }

    // Vimeo detection
    const vimeoRegex = /(?:vimeo\.com\/)(?:.*\/)?([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      const videoId = vimeoMatch[1];
      return {
        platform: 'vimeo',
        embedUrl: `https://player.vimeo.com/video/${videoId}?color=6f42c1&title=0&byline=0&portrait=0`,
        isEmbedded: true,
        mediaType: 'video'
      };
    }

    // Twitch detection
    const twitchRegex = /(?:twitch\.tv\/)(?:videos\/)?([0-9]+)/;
    const twitchMatch = url.match(twitchRegex);
    if (twitchMatch) {
      const videoId = twitchMatch[1];
      return {
        platform: 'twitch',
        embedUrl: `https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}`,
        isEmbedded: true,
        mediaType: 'video'
      };
    }

    // Dailymotion detection
    const dailymotionRegex = /(?:dailymotion\.com\/video\/)([A-Za-z0-9]+)/;
    const dailymotionMatch = url.match(dailymotionRegex);
    if (dailymotionMatch) {
      const videoId = dailymotionMatch[1];
      return {
        platform: 'dailymotion',
        embedUrl: `https://www.dailymotion.com/embed/video/${videoId}`,
        isEmbedded: true,
        mediaType: 'video'
      };
    }

    // Wistia detection
    const wistiaRegex = /(?:wistia\.com\/medias\/)([A-Za-z0-9]+)/;
    const wistiaMatch = url.match(wistiaRegex);
    if (wistiaMatch) {
      const videoId = wistiaMatch[1];
      return {
        platform: 'wistia',
        embedUrl: `https://fast.wistia.net/embed/iframe/${videoId}`,
        isEmbedded: true,
        mediaType: 'video'
      };
    }

    // JW Player detection
    const jwPlayerRegex = /(?:jwplatform\.com\/players\/)([A-Za-z0-9\-]+)/;
    const jwPlayerMatch = url.match(jwPlayerRegex);
    if (jwPlayerMatch) {
      const playerId = jwPlayerMatch[1];
      return {
        platform: 'jwplayer',
        embedUrl: `https://cdn.jwplayer.com/players/${playerId}.html`,
        isEmbedded: true,
        mediaType: 'video'
      };
    }

    // If no platform detected, treat as direct media file
    const detectedType = detectMediaType(url, type);
    return { 
      platform: 'direct', 
      embedUrl: url, 
      isEmbedded: false,
      mediaType: detectedType
    };
  };

  // Initialize platform detection
  useEffect(() => {
    const detection = detectPlatform(src);
    setPlatform(detection.platform);
    setEmbedUrl(detection.embedUrl);
    setIsEmbedded(detection.isEmbedded);
    setMediaType(detection.mediaType || detectMediaType(src, type));
    setIsLoading(false);
  }, [src, type]);

  // Playlist functionality
  const playNext = () => {
    if (playlist && onPlaylistChange && currentIndex < playlist.length - 1) {
      onPlaylistChange(currentIndex + 1);
    } else if (repeat === 'all' && playlist && onPlaylistChange) {
      onPlaylistChange(0);
    }
  };

  const playPrevious = () => {
    if (playlist && onPlaylistChange && currentIndex > 0) {
      onPlaylistChange(currentIndex - 1);
    } else if (repeat === 'all' && playlist && onPlaylistChange) {
      onPlaylistChange(playlist.length - 1);
    }
  };

  const shufflePlaylist = () => {
    if (playlist && onPlaylistChange) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      onPlaylistChange(randomIndex);
    }
  };

  // Get platform icon
  const getPlatformIcon = (platformName) => {
    switch (platformName) {
      case 'youtube': return <FaYoutube style={{ color: '#FF0000' }} />;
      case 'vimeo': return <FaVimeo style={{ color: '#1AB7EA' }} />;
      case 'twitch': return <FaTwitch style={{ color: '#9146FF' }} />;
      case 'soundcloud': return <FaSoundcloud style={{ color: '#FF5500' }} />;
      case 'spotify': return <FaSpotify style={{ color: '#1DB954' }} />;
      case 'bandcamp': return <FaMusic style={{ color: '#629aa0' }} />;
      case 'dailymotion': return <FaPlay style={{ color: '#00D2FF' }} />;
      case 'wistia': return <FaPlay style={{ color: '#54bbff' }} />;
      case 'jwplayer': return <FaPlay style={{ color: '#FF6A00' }} />;
      case 'direct': 
        return mediaType === 'audio' ? 
          <FaHeadphones style={{ color: '#6f42c1' }} /> : 
          <FaVideo style={{ color: '#6f42c1' }} />;
      default: return <FaExternalLinkAlt />;
    }
  };

  // Get platform name for display
  const getPlatformName = (platformName) => {
    switch (platformName) {
      case 'youtube': return 'YouTube';
      case 'vimeo': return 'Vimeo';
      case 'twitch': return 'Twitch';
      case 'soundcloud': return 'SoundCloud';
      case 'spotify': return 'Spotify';
      case 'bandcamp': return 'Bandcamp';
      case 'dailymotion': return 'Dailymotion';
      case 'wistia': return 'Wistia';
      case 'jwplayer': return 'JW Player';
      case 'direct': return mediaType === 'audio' ? 'Audio' : 'Video';
      default: return 'Media';
    }
  };

  // Open media in new tab for embedded media
  const openInNewTab = () => {
    if (src) {
      window.open(src, '_blank');
    }
  };

  // Media format detection and support
  const getSupportedFormats = () => {
    const video = document.createElement('video');
    const audio = document.createElement('audio');
    const formats = {
      // Video formats
      mp4: video.canPlayType('video/mp4; codecs="avc1.42E01E"'),
      webm: video.canPlayType('video/webm; codecs="vp8, vorbis"'),
      ogg: video.canPlayType('video/ogg; codecs="theora"'),
      mov: video.canPlayType('video/quicktime'),
      avi: video.canPlayType('video/x-msvideo'),
      mkv: video.canPlayType('video/x-matroska'),
      m4v: video.canPlayType('video/x-m4v'),
      flv: video.canPlayType('video/x-flv'),
      '3gp': video.canPlayType('video/3gpp'),
      wmv: video.canPlayType('video/x-ms-wmv'),
      // Audio formats
      mp3: audio.canPlayType('audio/mpeg'),
      wav: audio.canPlayType('audio/wav'),
      aac: audio.canPlayType('audio/aac'),
      flac: audio.canPlayType('audio/flac'),
      opus: audio.canPlayType('audio/opus'),
      wma: audio.canPlayType('audio/x-ms-wma'),
      m4a: audio.canPlayType('audio/mp4'),
      'ogg-audio': audio.canPlayType('audio/ogg')
    };
    return formats;
  };

  // Format media time to MM:SS or HH:MM:SS
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

  // Initialize audio context and analysis
  const initializeAudioAnalysis = () => {
    if (!mediaRef.current || audioContextRef.current) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(mediaRef.current);
      const analyser = audioContext.createAnalyser();
      const gainNode = audioContext.createGain();
      
      // Configure analyser
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      
      // Create EQ filter nodes (10-band equalizer)
      const filterNodes = [];
      const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
      
      frequencies.forEach((frequency, index) => {
        const filter = audioContext.createBiquadFilter();
        filter.type = index === 0 ? 'lowshelf' : index === frequencies.length - 1 ? 'highshelf' : 'peaking';
        filter.frequency.setValueAtTime(frequency, audioContext.currentTime);
        filter.Q.setValueAtTime(1, audioContext.currentTime);
        filter.gain.setValueAtTime(eqBands[index], audioContext.currentTime);
        filterNodes.push(filter);
      });
      
      // Connect audio graph
      source.connect(filterNodes[0]);
      filterNodes.forEach((filter, index) => {
        if (index < filterNodes.length - 1) {
          filter.connect(filterNodes[index + 1]);
        } else {
          filter.connect(gainNode);
        }
      });
      gainNode.connect(analyser);
      analyser.connect(audioContext.destination);
      
      // Store references
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      gainNodeRef.current = gainNode;
      filterNodesRef.current = filterNodes;
      
      // Initialize data arrays
      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);
      waveformDataRef.current = new Uint8Array(analyser.frequencyBinCount);
      
      startAnalysis();
    } catch (error) {
      console.warn('Audio analysis not supported:', error);
    }
  };

  // Start audio analysis animation loop
  const startAnalysis = () => {
    if (!analyserRef.current) return;
    
    const updateAnalysis = () => {
      if (analyserRef.current && frequencyDataRef.current) {
        analyserRef.current.getByteFrequencyData(frequencyDataRef.current);
        analyserRef.current.getByteTimeDomainData(waveformDataRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateAnalysis);
    };
    
    updateAnalysis();
  };

  // Update EQ band
  const updateEQBand = (bandIndex, gain) => {
    const newBands = [...eqBands];
    newBands[bandIndex] = gain;
    setEqBands(newBands);
    
    if (filterNodesRef.current[bandIndex]) {
      filterNodesRef.current[bandIndex].gain.setValueAtTime(
        gain, 
        audioContextRef.current?.currentTime || 0
      );
    }
  };

  // Apply audio effects
  const applyPitchShift = (shift) => {
    setPitchShift(shift);
    if (mediaRef.current) {
      mediaRef.current.preservesPitch = false;
      mediaRef.current.playbackRate = Math.pow(2, shift / 12);
    }
  };

  const applyTempoShift = (shift) => {
    setTempoShift(shift);
    if (mediaRef.current) {
      mediaRef.current.preservesPitch = true;
      mediaRef.current.playbackRate = 1 + (shift / 100);
    }
  };

  // Enhanced visualizer data
  const getVisualizerData = () => {
    if (!frequencyDataRef.current) return [];
    
    const dataArray = frequencyDataRef.current;
    const bars = 32; // Number of frequency bars
    const barData = [];
    
    for (let i = 0; i < bars; i++) {
      const start = Math.floor((i * dataArray.length) / bars);
      const end = Math.floor(((i + 1) * dataArray.length) / bars);
      let sum = 0;
      
      for (let j = start; j < end; j++) {
        sum += dataArray[j];
      }
      
      barData.push(sum / (end - start));
    }
    
    return barData;
  };

  // Crossfade between tracks
  const crossfadeToNext = () => {
    if (!playlist || !onPlaylistChange) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    
    if (crossfadeEnabled && gainNodeRef.current) {
      const fadeOutDuration = crossfadeDuration;
      const currentTime = audioContextRef.current?.currentTime || 0;
      
      // Fade out current track
      gainNodeRef.current.gain.setValueAtTime(1, currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, currentTime + fadeOutDuration);
      
      // Switch to next track after fade
      setTimeout(() => {
        onPlaylistChange(nextIndex);
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current?.currentTime || 0);
          gainNodeRef.current.gain.linearRampToValueAtTime(1, 
            (audioContextRef.current?.currentTime || 0) + fadeOutDuration);
        }
      }, fadeOutDuration * 1000);
    } else {
      onPlaylistChange(nextIndex);
    }
  };

  // Mini player toggle
  const toggleMiniPlayer = () => {
    setShowMiniPlayer(!showMiniPlayer);
  };

  // Spectrum analyzer
  const SpectrumAnalyzer = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !frequencyDataRef.current) return;
      
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      const draw = () => {
        if (!frequencyDataRef.current) return;
        
        ctx.clearRect(0, 0, width, height);
        
        const barWidth = width / frequencyDataRef.current.length;
        let x = 0;
        
        frequencyDataRef.current.forEach((value) => {
          const barHeight = (value / 255) * height;
          
          const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
          
          x += barWidth;
        });
        
        requestAnimationFrame(draw);
      };
      
      draw();
    }, []);
    
    return (
      <canvas
        ref={canvasRef}
        width={300}
        height={100}
        className="spectrum-canvas"
        style={{ width: '100%', height: '100px' }}
      />
    );
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      const current = mediaRef.current.currentTime;
      setCurrentTime(current);
      if (onTimeUpdate) onTimeUpdate(current);
    }
  };

  // Handle media ended
  const handleEnded = () => {
    setIsPlaying(false);
    
    if (repeat === 'one') {
      // Replay current media
      if (mediaRef.current) {
        mediaRef.current.currentTime = 0;
        mediaRef.current.play();
      }
    } else if (playlist && playlist.length > 1) {
      // Play next in playlist
      if (shuffle) {
        shufflePlaylist();
      } else {
        playNext();
      }
    }
    
    if (onEnded) onEnded();
  };

  // Handle duration change
  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
      setIsLoading(false);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (progressRef.current && mediaRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      mediaRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (mediaRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      mediaRef.current.muted = newMuted;
      if (newMuted) {
        mediaRef.current.volume = 0;
      } else {
        mediaRef.current.volume = volume;
      }
    }
  };

  // Skip forward/backward
  const skipTime = (seconds) => {
    if (mediaRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      mediaRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Toggle fullscreen (only for video)
  const toggleFullscreen = () => {
    if (mediaType === 'audio') return; // Fullscreen doesn't make sense for audio
    
    if (!document.fullscreenElement) {
      if (mediaRef.current.requestFullscreen) {
        mediaRef.current.requestFullscreen();
      } else if (mediaRef.current.webkitRequestFullscreen) {
        mediaRef.current.webkitRequestFullscreen();
      } else if (mediaRef.current.msRequestFullscreen) {
        mediaRef.current.msRequestFullscreen();
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
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowSettings(false);
  };

  // Toggle repeat mode
  const toggleRepeat = () => {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeat(modes[nextIndex]);
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  // Toggle audio visualizer (for audio files)
  const toggleVisualizer = () => {
    if (mediaType === 'audio') {
      setVisualizer(!visualizer);
    }
  };

  // Download media
  const downloadMedia = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = title || (mediaType === 'audio' ? 'audio' : 'video');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle media events
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setError(`Failed to load ${mediaType}`);
    const handleCanPlay = () => {
      setIsLoading(false);
      // Initialize audio analysis for audio files
      if (mediaType === 'audio' && showEqualizer) {
        initializeAudioAnalysis();
      }
    };

    media.addEventListener('play', handlePlay);
    media.addEventListener('pause', handlePause);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('error', handleError);
    media.addEventListener('canplay', handleCanPlay);
    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      media.removeEventListener('play', handlePlay);
      media.removeEventListener('pause', handlePause);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('error', handleError);
      media.removeEventListener('canplay', handleCanPlay);
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Cleanup audio analysis
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [handleTimeUpdate, handleEnded]);

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
      className={`media-player elegant ${isDark ? 'dark' : 'light'} ${mediaType} ${className}`}
      style={{ width, height }}
      onMouseEnter={() => !isEmbedded && setShowControls(true)}
      onMouseLeave={() => !isEmbedded && isPlaying && setShowControls(false)}
    >
      {/* Platform Badge */}
      {platform && platform !== 'direct' && (
        <div className="platform-badge">
          {getPlatformIcon(platform)}
          <span>{getPlatformName(platform)}</span>
        </div>
      )}

      {/* Media Type Indicator */}
      <div className="media-type-indicator">
        {mediaType === 'audio' ? <FaMusic /> : <FaVideo />}
        <span>{mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</span>
      </div>

      {/* Media Element or Embedded Player */}
      {isEmbedded ? (
        <div className="embedded-player">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="embedded-iframe"
            title={title}
          />
          
          {/* Embedded Controls Overlay */}
          <div className="embedded-controls">
            <button 
              className="control-btn external-link-btn" 
              onClick={openInNewTab}
              title={`Open in ${getPlatformName(platform)}`}
            >
              <FaExternalLinkAlt />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Native Media Element */}
          {mediaType === 'video' ? (
            <video
              ref={mediaRef}
              src={embedUrl}
              poster={poster}
              autoPlay={autoPlay}
              muted={muted}
              loop={loop && repeat === 'one'}
              className="media-element video-element"
              controls={false}
              preload="metadata"
            >
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
          ) : (
            <div className="audio-player-container">
              <audio
                ref={mediaRef}
                src={embedUrl}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop && repeat === 'one'}
                className="media-element audio-element"
                controls={false}
                preload="metadata"
              >
                Your browser does not support the audio tag.
              </audio>
              
              {/* Audio Visualization */}
              {visualizer && (
                <div className="audio-visualizer">
                  <div className="frequency-bars">
                    {Array.from({ length: 32 }, (_, i) => (
                      <div 
                        key={i} 
                        className="frequency-bar"
                        style={{ 
                          height: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Audio Cover Art */}
              {poster && (
                <div className="audio-cover">
                  <img src={poster} alt={title} className="cover-image" />
                  <div className="cover-overlay">
                    <h3 className="track-title">{title}</h3>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading Spinner */}
          {isLoading && (
            <div className="media-loading">
              <div className="loading-spinner"></div>
              <p>Loading {mediaType}...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="media-error">
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

          {/* Media Controls */}
          {controls && (
            <div className={`media-controls ${showControls ? 'visible' : 'hidden'}`}>
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
                {/* Time Display */}
                <div className="time-display">
                  <span className="current-time">{formatTime(currentTime)}</span>
                  <span className="time-separator">/</span>
                  <span className="total-time">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="controls-row">
                <div className="controls-left">
                  {/* Shuffle (for playlists) */}
                  {playlist && playlist.length > 1 && (
                    <button 
                      className={`control-btn ${shuffle ? 'active' : ''}`} 
                      onClick={toggleShuffle}
                      title="Shuffle"
                    >
                      <FaRandom />
                    </button>
                  )}

                  {/* Previous Track */}
                  {playlist && currentIndex > 0 && (
                    <button className="control-btn" onClick={playPrevious} title="Previous">
                      <FaStepBackward />
                    </button>
                  )}

                  {/* Skip Backward */}
                  <button className="control-btn" onClick={() => skipTime(-10)} title="Skip back 10s">
                    <FaBackward />
                  </button>

                  {/* Play/Pause */}
                  <button className="control-btn play-pause-btn" onClick={togglePlay}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>

                  {/* Skip Forward */}
                  <button className="control-btn" onClick={() => skipTime(10)} title="Skip forward 10s">
                    <FaForward />
                  </button>

                  {/* Next Track */}
                  {playlist && currentIndex < playlist.length - 1 && (
                    <button className="control-btn" onClick={playNext} title="Next">
                      <FaStepForward />
                    </button>
                  )}

                  {/* Repeat */}
                  <button 
                    className={`control-btn ${repeat !== 'none' ? 'active' : ''}`} 
                    onClick={toggleRepeat}
                    title={`Repeat: ${repeat}`}
                  >
                    <FaRedo />
                    {repeat === 'one' && <span className="repeat-indicator">1</span>}
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
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                  </div>

                  {/* Audio Visualizer Toggle (for audio) */}
                  {mediaType === 'audio' && (
                    <button 
                      className={`control-btn ${visualizer ? 'active' : ''}`} 
                      onClick={toggleVisualizer}
                      title="Toggle Visualizer"
                    >
                      <FaMusic />
                    </button>
                  )}

                  {/* Enhanced Audio Controls */}
                  {mediaType === 'audio' && (
                    <>
                      <button 
                        className={`control-btn ${showEq ? 'active' : ''}`}
                        onClick={() => setShowEq(!showEq)}
                        title="Equalizer"
                      >
                        🎚️
                      </button>
                      
                      <button 
                        className={`control-btn ${showSpectrum ? 'active' : ''}`}
                        onClick={() => setShowSpectrum(!showSpectrum)}
                        title="Spectrum Analyzer"
                      >
                        📊
                      </button>
                      
                      <button 
                        className={`control-btn ${showLyricsPanel ? 'active' : ''}`}
                        onClick={() => setShowLyricsPanel(!showLyricsPanel)}
                        title="Lyrics"
                      >
                        🎤
                      </button>
                    </>
                  )}

                  {/* Playlist Toggle */}
                  {playlist && (
                    <button 
                      className={`control-btn ${showPlaylistPanel ? 'active' : ''}`}
                      onClick={() => setShowPlaylistPanel(!showPlaylistPanel)}
                      title="Show Playlist"
                    >
                      📋
                    </button>
                  )}

                  {/* Mini Player Toggle */}
                  <button 
                    className="control-btn"
                    onClick={toggleMiniPlayer}
                    title="Mini Player"
                  >
                    🎵
                  </button>
                </div>

                <div className="controls-right">
                  {/* Advanced Audio Controls Toggle (for audio only) */}
                  {mediaType === 'audio' && (
                    <button 
                      className={`control-btn ${showAdvancedControls ? 'active' : ''}`} 
                      onClick={() => setShowAdvancedControls(!showAdvancedControls)}
                      title="Advanced Audio Controls"
                    >
                      <FaCog className={showAdvancedControls ? 'spinning' : ''} />
                    </button>
                  )}

                  {/* Playlist Toggle */}
                  {playlist && playlist.length > 0 && (
                    <button 
                      className={`control-btn ${showPlaylistPanel ? 'active' : ''}`}
                      onClick={() => setShowPlaylistPanel(!showPlaylistPanel)}
                      title="Show Playlist"
                    >
                      🎵 <span className="playlist-count">{playlist.length}</span>
                    </button>
                  )}

                  {/* Download Button */}
                  {showDownload && !isEmbedded && (
                    <button className="control-btn" onClick={downloadMedia} title={`Download ${mediaType}`}>
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

                  {/* Fullscreen (only for video) */}
                  {mediaType === 'video' && (
                    <button className="control-btn" onClick={toggleFullscreen} title="Fullscreen">
                      {isFullscreen ? <FaCompress /> : <FaExpand />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Media Title */}
      {title && (
        <div className="media-title">
          <h3>{title}</h3>
          {platform && platform !== 'direct' && (
            <span className="platform-indicator">
              {getPlatformIcon(platform)} {getPlatformName(platform)}
            </span>
          )}
        </div>
      )}

      {/* Enhanced Features Panel */}
      {mediaType === 'audio' && (
        <>
          {/* Equalizer Panel */}
          {showEq && (
            <div className="equalizer-panel">
              <div className="eq-header">
                <h4>10-Band Equalizer</h4>
                <button 
                  className="eq-close-btn"
                  onClick={() => setShowEq(false)}
                >
                  ×
                </button>
              </div>
              <div className="eq-bands">
                {['32Hz', '64Hz', '125Hz', '250Hz', '500Hz', '1kHz', '2kHz', '4kHz', '8kHz', '16kHz'].map((freq, index) => (
                  <div key={freq} className="eq-band">
                    <label>{freq}</label>
                    <input
                      type="range"
                      min="-12"
                      max="12"
                      step="0.5"
                      value={eqBands[index]}
                      onChange={(e) => updateEQBand(index, parseFloat(e.target.value))}
                      className="eq-slider"
                      orient="vertical"
                    />
                    <span className="eq-value">{eqBands[index].toFixed(1)}dB</span>
                  </div>
                ))}
              </div>
              <div className="eq-presets">
                <button onClick={() => setEqBands([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}>Flat</button>
                <button onClick={() => setEqBands([6, 4, 2, 0, -2, -4, -2, 0, 2, 4])}>Rock</button>
                <button onClick={() => setEqBands([4, 2, 0, -2, -4, -2, 0, 2, 4, 6])}>Pop</button>
                <button onClick={() => setEqBands([2, 0, -2, -4, -2, 0, 2, 4, 6, 8])}>Classical</button>
                <button onClick={() => setEqBands([8, 6, 4, 2, 0, -2, 0, 2, 4, 6])}>Bass Boost</button>
              </div>
            </div>
          )}

          {/* Spectrum Analyzer */}
          {showSpectrum && (
            <div className="spectrum-panel">
              <div className="spectrum-header">
                <h4>Spectrum Analyzer</h4>
                <button 
                  className="spectrum-close-btn"
                  onClick={() => setShowSpectrum(false)}
                >
                  ×
                </button>
              </div>
              <SpectrumAnalyzer />
            </div>
          )}

          {/* Audio Effects Panel - Collapsible */}
          {showAdvancedControls && (
            <div className="audio-effects-panel">
              <div className="effects-header">
                <h4>Advanced Audio Controls</h4>
                <button 
                  className="effects-close-btn"
                  onClick={() => setShowAdvancedControls(false)}
                >
                  ×
                </button>
              </div>

              <div className="effects-row">
                <div className="effect-control">
                  <label>Pitch Shift</label>
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="1"
                    value={pitchShift}
                    onChange={(e) => applyPitchShift(parseFloat(e.target.value))}
                    className="effect-slider"
                  />
                  <span>{pitchShift > 0 ? '+' : ''}{pitchShift} semitones</span>
                </div>
                
                <div className="effect-control">
                  <label>Tempo</label>
                  <input
                    type="range"
                    min="-50"
                    max="100"
                    step="5"
                    value={tempoShift}
                    onChange={(e) => applyTempoShift(parseFloat(e.target.value))}
                    className="effect-slider"
                  />
                  <span>{tempoShift > 0 ? '+' : ''}{tempoShift}%</span>
                </div>
              </div>

              <div className="effects-buttons">
                <button 
                  className={`effect-btn ${showEq ? 'active' : ''}`}
                  onClick={() => setShowEq(!showEq)}
                  title="Toggle Equalizer"
                >
                  EQ
                </button>
                <button 
                  className={`effect-btn ${showSpectrum ? 'active' : ''}`}
                  onClick={() => setShowSpectrum(!showSpectrum)}
                  title="Toggle Spectrum Analyzer"
                >
                  Spectrum
                </button>
                <button 
                  className={`effect-btn ${crossfadeEnabled ? 'active' : ''}`}
                  onClick={() => setCrossfadeEnabled(!crossfadeEnabled)}
                  title="Toggle Crossfade"
                >
                  Crossfade
                </button>
                <button 
                  className={`effect-btn ${showWaveformViz ? 'active' : ''}`}
                  onClick={() => setShowWaveformViz(!showWaveformViz)}
                  title="Toggle Waveform"
                >
                  Waveform
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Playlist Panel */}
      {showPlaylistPanel && playlist && (
        <div className="playlist-panel">
          <div className="playlist-header">
            <h4>Playlist ({playlist.length} tracks)</h4>
            <button 
              className="playlist-close-btn"
              onClick={() => setShowPlaylistPanel(false)}
            >
              ×
            </button>
          </div>
          <div className="playlist-items">
            {playlist.map((item, index) => (
              <div 
                key={index}
                className={`playlist-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => onPlaylistChange && onPlaylistChange(index)}
              >
                <div className="track-number">{index + 1}</div>
                <div className="track-info">
                  <div className="track-title">{item.title || `Track ${index + 1}`}</div>
                  <div className="track-duration">{item.duration || '0:00'}</div>
                </div>
                {index === currentIndex && isPlaying && (
                  <div className="now-playing-indicator">
                    <div className="eq-bar"></div>
                    <div className="eq-bar"></div>
                    <div className="eq-bar"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lyrics Panel */}
      {showLyricsPanel && (
        <div className="lyrics-panel">
          <div className="lyrics-header">
            <h4>Lyrics</h4>
            <button 
              className="lyrics-close-btn"
              onClick={() => setShowLyricsPanel(false)}
            >
              ×
            </button>
          </div>
          <div className="lyrics-content">
            {currentLyrics ? (
              <p>{currentLyrics}</p>
            ) : (
              <p className="no-lyrics">No lyrics available for this track</p>
            )}
          </div>
        </div>
      )}

      {/* Mini Player */}
      {showMiniPlayer && (
        <div className="mini-player">
          <div className="mini-controls">
            <button onClick={playPrevious} className="mini-btn">
              <FaStepBackward />
            </button>
            <button onClick={togglePlay} className="mini-btn play-btn">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={playNext} className="mini-btn">
              <FaStepForward />
            </button>
          </div>
          <div className="mini-info">
            <div className="mini-title">{title}</div>
            <div className="mini-time">{formatTime(currentTime)} / {formatTime(duration)}</div>
          </div>
          <button 
            className="mini-close"
            onClick={() => setShowMiniPlayer(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaPlayer;