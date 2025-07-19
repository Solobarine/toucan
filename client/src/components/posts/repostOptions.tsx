import { useFormik } from "formik";
import { useState } from "react";
import { AlertTriangle, Loader, PenBox, Plane, Trash2, X } from "lucide-react";
import * as Yup from "yup";
import TextInput from "../form/inputs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { useNavigate } from "react-router-dom";
import { deleteRepost } from "../../features/thunks/posts";

const RepostOptions = ({
  repostId,
  repostOwner,
  closeModal,
}: {
  repostId: number;
  repostOwner?: number;
  closeModal: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const {
    deleteRepost: { status },
  } = useSelector((state: RootState) => state.posts);

  const handleDelete = () => {
    // Add your delete logic here
    dispatch(deleteRepost(repostId!)).finally(() => {
      setDeleteModalOpen(false);
      closeModal();
    });
  };

  return (
    <>
      <div className="absolute top-4 right-2 bg-white dark:bg-neutral-800 w-64 p-2 rounded-xl shadow-xl border border-gray-200 dark:border-neutral-700 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex justify-between items-center mb-2 px-2 py-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Options
          </span>
          <button
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded-lg transition-all duration-200"
            onClick={closeModal}
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-1">
          {user?.id == repostOwner && (
            <>
              <button
                className="flex items-center gap-3 w-full px-3 py-2.5 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:translate-x-1 group"
                onClick={() => setDeleteModalOpen(true)}
              >
                <Trash2
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className="font-medium">
                  {status == "pending" ? "Deleting..." : "Delete Repost"}
                </span>
              </button>
              <button
                className="flex items-center gap-3 w-full px-3 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200 hover:translate-x-1 group"
                onClick={() => navigate(`/reposts/${repostId}/update`)}
              >
                <PenBox
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className="font-medium">Edit Repost</span>
              </button>
            </>
          )}
          <button
            className="flex items-center gap-3 w-full px-3 py-2.5 text-left text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 hover:translate-x-1 group"
            onClick={() => setFormOpen(true)}
          >
            <AlertTriangle
              size={18}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="font-medium">Report Repost</span>
          </button>
        </div>
      </div>

      {formOpen && <Report closeModal={() => setFormOpen(false)} />}
      {deleteModalOpen && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

const DeleteConfirmation = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onConfirm();
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md mx-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-neutral-700 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20">
            <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>

          <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-2">
            Delete Post
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
            Are you sure you want to delete this post? This action cannot be
            undone and will permanently remove the post and all its comments.
          </p>

          <div className="flex gap-3">
            <button
              className="flex-1 px-4 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-700 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-600 transition-all duration-200 font-medium"
              onClick={onCancel}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Report = ({ closeModal }: { closeModal: () => void }) => {
  const validationSchema = Yup.object().shape({
    reason: Yup.string()
      .min(5, "Minimum of 5 Characters")
      .max(1000, "Maximum of 1000 Characters")
      .required("Reason is Required"),
  });

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: { reason: "" },
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        // Add your report submission logic here
        setTimeout(() => {
          closeModal();
        }, 1000);
      },
    });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl mx-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-neutral-700 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/20">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Report Repost
              </h3>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-200"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              name="reason"
              label="Reason for Reporting"
              type="textarea"
              value={values.reason}
              error={errors.reason}
              touched={touched.reason}
              handleChange={handleChange}
              placeholder="Please describe why you're reporting this post..."
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="flex-1 px-4 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-700 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-600 transition-all duration-200 font-medium"
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 hover:scale-105 active:scale-95 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Plane className="w-4 h-4" />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RepostOptions;
