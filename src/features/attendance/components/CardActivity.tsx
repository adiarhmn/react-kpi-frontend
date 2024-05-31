type ActivityProps = {
  isCheckedIn: boolean;
};
export const CardActivity: React.FC<ActivityProps> = ({ isCheckedIn }: ActivityProps) => {
  return <h1>{isCheckedIn}</h1>;
};
