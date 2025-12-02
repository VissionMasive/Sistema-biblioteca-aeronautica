import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Field,
  Textarea,
} from "@headlessui/react";
import clsx from "clsx";

export default function ModalAction({
  answer,
  handleOpenModal,
  isOpen,
  handleChangeMsg,
  msg,
  handleSubmit
}) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={(e) => handleOpenModal(e)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-slate-500 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              {answer}
            </DialogTitle>
            <Field>
              <Description className="mt-2 text-sm/6 text-white/50">
                Mensaje de resultado de la solicitud
              </Description>
              <Textarea
                value={msg}
                onChange={(e) => handleChangeMsg(e.target.value)}
                className={clsx(
                  "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                  "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                )}
                rows={3}
              />
            </Field>
            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                onClick={(e) => handleSubmit(e)}
              >
                Enviar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}