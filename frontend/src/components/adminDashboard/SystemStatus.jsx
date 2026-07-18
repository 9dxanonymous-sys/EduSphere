import { motion } from "framer-motion";
import {
  Database,
  Server,
  ShieldCheck,
  Wifi,
  CheckCircle2,
} from "lucide-react";

function SystemStatus() {

  const items = [
    {
      icon: Database,
      title: "Database",
      status: "Online",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: Server,
      title: "Server",
      status: "Healthy",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Wifi,
      title: "API",
      status: "Running",
      color: "text-cyan-500",
      bg: "bg-cyan-50",
    },
    {
      icon: ShieldCheck,
      title: "Security",
      status: "Protected",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (

    <motion.div

      initial={{ opacity: 0, x: -30 }}

      animate={{ opacity: 1, x: 0 }}

      whileHover={{ y: -3 }}

      className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 transition-all duration-300"

    >

      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">

          <CheckCircle2
            size={22}
            className="text-green-600"
          />

        </div>

        System Status

      </h2>

      <div className="space-y-4">

        {

          items.map((item) => {

            const Icon = item.icon;

            return (

              <div

                key={item.title}

                className="flex justify-between items-center p-3 rounded-2xl hover:bg-gray-50 transition"

              >

                <div className="flex items-center gap-4">

                  <div

                    className={`${item.bg} w-12 h-12 rounded-xl flex items-center justify-center`}

                  >

                    <Icon

                      size={22}

                      className={item.color}

                    />

                  </div>

                  <div>

                    <p className="font-semibold text-gray-800">

                      {item.title}

                    </p>

                    <p className="text-sm text-gray-500">

                      System Service

                    </p>

                  </div>

                </div>

                <span

                  className={`font-semibold ${item.color}`}

                >

                  ● {item.status}

                </span>

              </div>

            );

          })

        }

      </div>

    </motion.div>

  );

}

export default SystemStatus;