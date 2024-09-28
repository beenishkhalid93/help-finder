import { Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
