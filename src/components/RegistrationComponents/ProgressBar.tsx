
interface ProgressBarProps {
  value: number;
  color?: string; 
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "bg-blue-600",
  height = "h-2.5",
}) => {
  // Clamp the value between 0 and 100
  const progress = Math.min(80, Math.max(0, value));

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}
    >
      <div
        className={`${color} h-full rounded-full transition-all duration-500 ease-in-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
