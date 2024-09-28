import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { CircularProgressContainer, ProgressText } from './Dashboard.styles';

const ProgressWidget = ({ title, value }: { title: string; value: number }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <CircularProgressContainer>
          <CircularProgress variant="determinate" value={value} size={100} />
          <ProgressText>
            <Typography variant="h6">{`${value}%`}</Typography>
          </ProgressText>
        </CircularProgressContainer>
      </CardContent>
    </Card>
  );
};

export default ProgressWidget;
