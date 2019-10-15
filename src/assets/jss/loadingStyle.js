const dots = {
  width: "60%",
  height: "60%",
  display: "inline-block",
  position: "absolute",
  top: 0,
  backgroundColor: "#fff",
  borderRadius: "100%",
  animation: "sk-bounce 2.0s infinite ease-in-out"
};

const loadingStyles = {
  showloading: {
    opacity: "1!important",
    zIndex: "2!important"
  },
  loadingHolder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    opacity: 0,
    zIndex: 0,
    background: "#ececec",
    animation: "fade-holder 2.0s infinite linear",
    "animation-delay": "-2.0s",
    transition: "opacity .3s ease-in-out"
  },
  spinner: {
    margin: "100px auto",
    width: 90,
    height: 90,
    position: "relative",
    textAlign: "center",
    animation: "sk-rotate 2.0s infinite linear"
  },
  dot1: {
    ...dots
  },
  dot2: {
    ...dots,
    top: "auto",
    bottom: 0,
    "animation-delay": "-1.0s"
  },
  "@global": {
    "@keyframes sk-rotate": {
      "100%": {
        transform: "rotate(360deg)"
      }
    },
    "@keyframes sk-bounce": {
      "0%, 100%": {
        transform: "scale(0.0)"
      },
      "50%": {
        transform: "scale(1.0)"
      }
    },
    "@keyframes fade-holder": {
      "0%": { transform: "opacity(0)" },
      "100%": { transform: "opacity(1)" }
    }
  }
};

export default loadingStyles;
