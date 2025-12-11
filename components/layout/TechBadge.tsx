interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'primary' | 'jira';
}

export default function TechBadge({ name, variant = 'default' }: TechBadgeProps) {
  const styles = {
    default: 'bg-gray-100 text-gray-700 border-gray-300',
    primary: 'bg-blue-100 text-blue-700 border-blue-300',
    jira: 'bg-purple-100 text-purple-700 border-purple-300',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${styles[variant]}`}
    >
      {name}
    </span>
  );
}
