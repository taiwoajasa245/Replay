import React from "react";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirmBtn = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
          Delete Image
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 text-center sm:text-left">
          Are you sure you want to delete this image? This action cannot be
          undone.
        </p>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 w-full sm:w-auto rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmBtn}
            className="px-4 py-2 w-full sm:w-auto rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
