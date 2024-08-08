import ProfileImage from "../../assets/images/profile.png";

function log() {
  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];

    if (typeof arg === "object") {
      arg = JSON.stringify(arg, null, 2);
    }
    console.log(arg);
  }
}

function thumbnail(url) {
  if (!url) {
    return ProfileImage;
  }
  return {
    uri: "http://" + "10.0.2.2:8000" + url,
  };
}

function formatTime(date) {
  if (date === null) {
    return "-";
  }
  const now = new Date();
  const s = Math.abs(now - new Date(date)) / 1000;

  if (s < 60) {
    return "now";
  }

  if (s < 60 * 60) {
    const m = Math.floor(s / 60);
    return `${m}m ago`;
  }
  if (s < 60 * 60 * 24) {
    const h = Math.floor(s / 3600);
    return `${h}h ago`;
  }
  if (s < 60 * 60 * 24 * 7) {
    const d = Math.floor(s / 86400);
    return `${d}d ago`;
  }
  if (s < 60 * 60 * 24 * 30) {
    const w = Math.floor(s / 604800);
    return `${w}w ago`;
  }
  const y = Math.floor(s / (60 * 60 * 24 * 365));
  return `${y}y ago`;
}

export default { log, thumbnail, formatTime };
