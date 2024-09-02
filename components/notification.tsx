import React from "react";

type Props = {
  text: string;
  title: string;
  open: boolean;
  handleClose: () => void;
};

const Notification = ({ open, handleClose, text, title }: Props) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog transition-opacity ${
        open ? "" : "opacity-0 invisible"
      }`}
    >
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
          <div className="md:flex items-center">
            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
              <i className="bx bx-error text-3xl">&#9888;</i>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-bold">{title}</p>
              <p className="text-sm text-gray-700 mt-1 break-all">{text}</p>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              id="confirm-delete-btn"
              onClick={handleClose}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2  rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
