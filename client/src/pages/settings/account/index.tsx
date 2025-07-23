import { FormEvent, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../../features/store";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import {
  AlertTriangle,
  Camera,
  Disc,
  Download,
  Eye,
  EyeOff,
  Key,
  Shield,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../components/form/inputs";
import PrimaryButton from "../../../components/primaryButton";
import {
  updateAvatar as handleUpdateAvatar,
  updatePassword,
  updateProfile,
} from "../../../features/thunks/auth";
import LargeAvatar from "../../../components/avatar/large";
import {
  UpdatePasswordSchema,
  UpdateProfileSchema,
} from "../../../schemas/auth";

const PasswordInput = ({
  label,
  value,
  onChange,
  show,
  onToggleShow,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 pr-10 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="button"
        onClick={onToggleShow}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

const Account = () => {
  const { user, updateAvatar } = useSelector((state: RootState) => state.auth);

  const avatarRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const {
    values,
    errors,
    touched,
    handleChange,
    isSubmitting,
    setSubmitting,
    submitForm,
  } = useFormik({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    validationSchema: UpdateProfileSchema,
    onSubmit(values) {
      console.log(values);
      dispatch(updateProfile(values));
    },
  });

  const updatePasswordForm = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      dispatch(updatePassword(values)).finally(() => setSubmitting(false));
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    submitForm().finally(() => setSubmitting(false));
  };

  const handleAvatarUpload = () => {
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileExtensions = ["jpg", "jpeg", "gif", "png", "avif", "webp"];
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    const file = event.target.files?.[0];

    if (file) {
      // Check File Size
      if (file.size > maxFileSize) {
        alert("File should be less than 2MB");
        return;
      }

      // Check File extension
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!ext || !fileExtensions.includes(ext)) {
        alert("Unsupported file type. Please use JPG, PNG, GIF, AVIF, or WebP");
        return;
      }

      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const clearAvatar = () => {
    setAvatar(null);
    setPreview(null);
  };

  const uploadAvatar = async () => {
    if (!avatar) return;
    const formData = new FormData();

    formData.append("avatar", avatar);

    dispatch(handleUpdateAvatar(formData));
  };

  const handleDeactivateAccount = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Account deactivated successfully");
      setShowDeactivateDialog(false);
    } catch {
      alert("Failed to deactivate account");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Account deletion initiated");
      setShowDeleteDialog(false);
    } catch {
      alert("Failed to delete account");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadData = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Data download started. You'll receive an email when it's ready.");
    } catch {
      alert("Failed to start data download");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="min-h-screen space-y-8">
      <Helmet>
        <title>Toucan - Account Settings</title>
        <meta
          name="description"
          content="Manage your Toucan account settings"
        />
      </Helmet>
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
            Profile Information
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            Update your personal information and user details
          </p>
        </div>

        {/* Profile Picture */}
        <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-4">
          <h5 className="font-medium text-neutral-900 dark:text-white mb-4">
            Profile Picture
          </h5>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview || user?.avatar}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <LargeAvatar
                    avatar={user?.avatar as string}
                    first_name={user?.first_name as string}
                    last_name={user?.last_name as string}
                  />
                )}
              </div>
              <button
                onClick={handleAvatarUpload}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Upload a new profile picture. Recommended size: 400x400px. Max
                file size: 2MB.
              </p>
              <div className="flex gap-2">
                <input
                  ref={avatarRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />

                {avatar ? (
                  <>
                    <button
                      onClick={uploadAvatar}
                      disabled={updateAvatar.status == "pending"}
                      className="px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {updateAvatar.status == "pending" ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={clearAvatar}
                      className="px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleAvatarUpload}
                      className="px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Upload New
                    </button>
                    <button
                      onClick={clearAvatar}
                      className="px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-neutral-50 dark:bg-stone-700/50 rounded-xl p-6 border border-stone-200 dark:border-stone-700">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-6">
            Basic Information
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <TextInput
              label="First Name"
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              handleChange={handleChange}
              value={values.first_name}
              error={errors.first_name}
              touched={touched.first_name}
            />

            <TextInput
              label="Last Name"
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              handleChange={handleChange}
              value={values.last_name}
              error={errors.last_name}
              touched={touched.last_name}
            />

            <TextInput
              label="username"
              type="text"
              name="username"
              placeholder="Enter Username"
              handleChange={handleChange}
              value={values.username}
              error={errors.username}
              touched={touched.username}
            />

            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="Enter Email"
              handleChange={handleChange}
              value={values.email}
              error={undefined}
              touched={false}
              disabled
            />

            <TextInput
              label="Bio"
              type="textarea"
              name="bio"
              placeholder="Enter Bio"
              handleChange={handleChange}
              value={values.bio}
              error={errors.bio}
              touched={touched.bio}
              className="md:col-span-2"
            />
            <PrimaryButton
              className="flex items-center gap-3 w-fit px-10"
              disabled={isSubmitting}
            >
              <Disc />
              Update Information
            </PrimaryButton>
          </form>
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-purple-600" />
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-white">
                Password
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Change your account password
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-4 py-2 text-purple-600 border border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
          >
            Change Password
          </button>
        </div>

        {showPasswordForm && (
          <div className="ml-8 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-4">
            <TextInput
              label="Current Password"
              type="password"
              name="current_password"
              placeholder=""
              handleChange={updatePasswordForm.handleChange}
              value={updatePasswordForm.values.current_password}
              error={updatePasswordForm.errors.current_password}
              touched={updatePasswordForm.touched.current_password}
            />
            <TextInput
              label="New Password"
              type="password"
              name="new_password"
              placeholder=""
              handleChange={updatePasswordForm.handleChange}
              value={updatePasswordForm.values.new_password}
              error={updatePasswordForm.errors.new_password}
              touched={updatePasswordForm.touched.new_password}
            />
            <TextInput
              label="Confirm New Password"
              type="password"
              name="confirm_password"
              placeholder=""
              handleChange={updatePasswordForm.handleChange}
              value={updatePasswordForm.values.confirm_password}
              error={updatePasswordForm.errors.confirm_password}
              touched={updatePasswordForm.touched.confirm_password}
            />

            <div className="flex gap-3">
              <button
                onClick={updatePasswordForm.submitForm}
                disabled={updatePasswordForm.isSubmitting}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updatePasswordForm.isSubmitting
                  ? "Changing..."
                  : "Change Password"}
              </button>
              <button
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Download */}
      <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-white">
                Download Your Data
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Get a copy of all your data including posts, messages, and
                profile information
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadData}
            disabled={isProcessing}
            className="px-4 py-2 text-blue-600 border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Download Data"}
          </button>
        </div>
      </div>

      {/* Account Deactivation */}
      <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-amber-600" />
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-white">
                Deactivate Account
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Temporarily disable your account. You can reactivate it anytime
                by logging in
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDeactivateDialog(true)}
            className="px-4 py-2 text-amber-600 border border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
          >
            Deactivate
          </button>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-600" />
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-white">
                Delete Account
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Permanently delete your account and all associated data. This
                action cannot be undone
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="px-4 py-2 text-red-600 border border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors whitespace-nowrap"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Deactivate Confirmation Dialog */}
      {showDeactivateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Deactivate Account
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Are you sure you want to deactivate your account? Your profile
                will be hidden from other users, but you can reactivate it
                anytime by logging in.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeactivateDialog(false)}
                  disabled={isProcessing}
                  className="px-4 py-2 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeactivateAccount}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  {isProcessing ? "Deactivating..." : "Deactivate Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Delete Account
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                <strong>This action cannot be undone.</strong> All your posts,
                messages, friends, and profile data will be permanently deleted.
                Are you absolutely sure?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  disabled={isProcessing}
                  className="px-4 py-2 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {isProcessing ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Account;
