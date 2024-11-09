"use client";
import { useGroupOverviewStore } from "@/state/group.overview";
import {
  Button,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { remark } from "remark";

export default function QuickViewModal() {
  const useGroupOverViewStore = useGroupOverviewStore();

  return (
    <Transition show={!!useGroupOverViewStore.selectedGroup} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => useGroupOverViewStore.setSelectedGroup(null)}
      >
        <div className="min-h-screen px-4 text-center">
          <DialogPanel className="fixed inset-0 bg-black bg-opacity-30" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              {useGroupOverViewStore.selectedGroup && (
                <>
                  <h3 className="text-xl font-semibold text-purple-700">
                    {useGroupOverViewStore.selectedGroup.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Debut Year:{" "}
                    {new Date(
                      useGroupOverViewStore.selectedGroup.debut_date
                    ).getFullYear()}
                  </p>
                  <p className="text-sm text-gray-500">Popularity: 100,000</p>
                  <div
                    className="mt-4 text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: remark()
                        .processSync(useGroupOverViewStore.selectedGroup.bio)
                        .toString(),
                    }}
                  />
                  <Button
                    onClick={() => useGroupOverViewStore.setSelectedGroup(null)}
                    className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Close
                  </Button>
                </>
              )}
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
