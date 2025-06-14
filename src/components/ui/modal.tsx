'use client';

import { Fragment, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as={Fragment} open={isOpen} onClose={onClose}>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* ✅ Replaced Dialog.Overlay with regular div for backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                'relative z-50 w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-xl',
                className
              )}
            >
              {children}
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
