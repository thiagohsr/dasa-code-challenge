import bookmarkIcon from "@/assets/svg/bookmark-24px.svg";
import starIcon from "@/assets/svg/stars-24px.svg";

const listRepositoriesStyle = {
  list: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    boxShadow:
      "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 6px 5px rgba(0, 0, 0, 0.24)",
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    paddingLeft: 0
  },
  listItem: {
    background: {
      image: `url(${bookmarkIcon})`,
      repeat: "no-repeat",
      position: "10px center"
    },
    borderBottomColor: "#f3f3f3",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    boxSizing: "border-box",
    "& p": {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      "& a": {
        color: "#009688",
        textDecoration: "none",
        "&:hover": {
          color: "black",
          transition: "color .8s ease-in-out"
        }
      }
    },
    paddingRight: 15,
    paddingLeft: 45
  },
  stars: {
    background: {
      image: `url(${starIcon})`,
      repeat: "no-repeat",
      position: "right center"
    },
    color: "#9E9E9E",
    paddingTop: 8,
    paddingLeft: 15,
    paddingRight: 30,
    paddingBottom: 8
  }
};

export default listRepositoriesStyle;
