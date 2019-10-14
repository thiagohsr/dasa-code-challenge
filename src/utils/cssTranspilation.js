import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const classes = styles => {
  return jss.createStyleSheet(styles).attach().classes;
};

export default classes;
