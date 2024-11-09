import { useEventStore } from "@/state/idol.events";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

export default function IdolEventModalDetails() {
  const eventStore = useEventStore();

  return (
    <Transition show={eventStore.isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => eventStore.setIsModalOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel
              className="fixed inset-0 transform transition-all"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black opacity-75" />
            </DialogPanel>
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {eventStore.selectedEvent?.title}
              </DialogTitle>
              <div className="mt-2">
                <p className="text-gray-600">
                  Date:{" "}
                  {eventStore.selectedEvent &&
                    new Date(
                      eventStore.selectedEvent.date
                    ).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Type: {eventStore.selectedEvent?.type}
                </p>
                {eventStore.selectedEvent?.location && (
                  <p className="text-gray-600">
                    Location: {eventStore.selectedEvent.location}
                  </p>
                )}
                <p className="mt-4 text-gray-700">
                  {eventStore.selectedEvent?.description}
                </p>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => eventStore.setIsModalOpen(false)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
