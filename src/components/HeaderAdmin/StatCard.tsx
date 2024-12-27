import { motion } from "framer-motion";

interface StatCardProps {
  name: string;
  color: string;
  value: string | number;
  icon: any;
  text?: string;
}

const Statcard: React.FC<StatCardProps> = ({
  name,
  color,
  value,
  icon: Icon,
  text,
}) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg roundded-xl border border-gray-800"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-400">
          <Icon size={20} className="mr-2" style={{ color }} /> {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-gray-100">
          {value} {text}
        </p>
      </div>
    </motion.div>
  );
};

export default Statcard;
