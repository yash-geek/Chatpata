// confirmToast.js
import toast from 'react-hot-toast';
import React from 'react';

export const confirmToast = (message) => {
    return new Promise((resolve) => {
        toast.custom((t) => (
            <div
                className={`bg-white shadow-lg border border-gray-300 rounded-md p-4 flex flex-col gap-2 ${t.visible ? 'animate-enter' : 'animate-leave'
                    }`}
            >
                <span className="text-sm">{message}</span>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            resolve(true);
                        }}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            resolve(false);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        No
                    </button>
                </div>
            </div>
        ), { duration: Infinity });
    });
};
