import { Box } from '@mui/material';

function SectionDivider(props) {
  const h = props.h || 1;
  return <Box sx={{ height: 70 * h }} {...props} />;
}

export default SectionDivider;
