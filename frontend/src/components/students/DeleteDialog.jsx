import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

function DeleteDialog({
  open,
  onClose,
  onDelete,
  student,
}) {

  if (!open) return null;

  return (

    <AnimatePresence>

      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <motion.div
          initial={{
            scale: .8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: .8,
            opacity: 0,
          }}
          className="bg-white rounded-3xl shadow-2xl w-[430px] overflow-hidden"
        >

          <div className="bg-red-600 text-white p-6 flex items-center gap-4">

            <Trash2 size={34} />

            <h2 className="text-2xl font-bold">
              Delete Student
            </h2>

          </div>

          <div className="p-8">

            <p className="text-gray-700 leading-7">

              Are you sure you want to delete

              <span className="font-bold">

                {" "}{student?.full_name}

              </span>

              ?

            </p>

          </div>

          <div className="border-t p-6 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={onDelete}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );
}

export default DeleteDialog;