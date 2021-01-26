import styled from "styled-components";

import { motion } from "framer-motion";

export const SToastContainer = styled("div")`
  position: absolute;
  top: 0;
  right: 0;
`;

export const SToast = styled(motion.div)`
position: relative,
margin: 75px 40px,
`;
