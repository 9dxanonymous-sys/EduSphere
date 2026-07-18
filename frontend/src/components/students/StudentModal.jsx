import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function StudentModal({
  open,
  onClose,
  title,
  form,
  setForm,
  onSubmit,
  isView = false,
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
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-[600px] max-w-[95%] overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {title}
            </h2>

            <button onClick={onClose}>
              <X size={28} />
            </button>
          </div>

          <div className="p-8 space-y-5">

            <div>

              <label className="font-semibold">
                Full Name
              </label>

              <input
                disabled={isView}
                value={form.full_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    full_name: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="font-semibold">
                Email
              </label>

              <input
                disabled={isView}
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full mt-2 border rounded-xl px-4 py-3"
              />

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>

                <label className="font-semibold">
                  Department
                </label>

                <input
                  disabled={isView}
                  value={form.department}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      department: e.target.value,
                    })
                  }
                  className="w-full mt-2 border rounded-xl px-4 py-3"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Semester
                </label>

                <input
                  type="number"
                  disabled={isView}
                  value={form.semester}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      semester: e.target.value,
                    })
                  }
                  className="w-full mt-2 border rounded-xl px-4 py-3"
                />

              </div>

            </div>

          </div>

          {!isView && (

            <div className="border-t p-6 flex justify-end gap-3">

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={onSubmit}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Student
              </button>

            </div>

          )}

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}

export default StudentModal;