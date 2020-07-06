import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { ResponsiveValue, variant } from 'styled-system';
import { motion, AnimatePresence } from 'framer-motion';
import { filter, update } from 'ramda';
import { FaTimes } from 'react-icons/fa';

import useWindowVisible from '@hooks/useWindowVisible';
import { getColor } from '@styled/theme';
import Box, { BoxProps } from '@styled/Box';
import noop from '@utils/noop';
import generateId from '@utils/generateId';
import useHover from '@hooks/useHover';

export type ToastContent = string | React.ReactNode;

type ToastType = 'default' | 'success' | 'error';

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  showClose?: boolean;
  onClose?: (id: string) => void;
  duration?: number | null;
}

const ToastRack = styled(Box)`
  pointer-events: none;
  position: fixed;
  box-sizing: border-box;
  overflow-x: hidden;
  top: 0;
  bottom: 0;
  right: 0;
`;

interface ToastContainerProps extends BoxProps {
  variant?: ResponsiveValue<ToastType>;
}

const ToastContainer = styled(Box)<ToastContainerProps>`
  display: flex;
  pointer-events: bounding-box;
  justify-content: space-between;
  box-sizing: border-box;
  background: ${getColor('neutralLightest')};
  color: ${getColor('neutralDark')};
  box-shadow: 0px 5px 0px -1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: border-color 500ms;

  border: 1px solid ${getColor('neutralMid')};
  border-left: 0.5rem solid ${getColor('neutralDark')};

  ${variant<{}, ToastType>({
    variants: {
      default: {
        borderLeftColor: 'neutralDark',
      },
      success: {
        borderLeftColor: 'positive',
      },
      error: {
        borderLeftColor: 'negative',
      },
    },
  })}
`;

const ToastCloseContainer = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: none;

  color: ${getColor('neutralMidDark')};

  :hover {
    color: ${getColor('neutralDark')};
  }
`;

const MotionToastContainer = motion.custom(ToastContainer);

export interface ToastProps extends ToastOptions {
  id: string;
  content: ToastContent;
}

function Toast({ content, type, id, onClose, showClose, duration }: ToastProps) {
  const visible = useWindowVisible();
  const { hoverRef, isHovered } = useHover();

  useEffect(() => {
    if (!duration || !visible || isHovered) return;

    const timeout = setTimeout(() => {
      onClose && onClose(id);
    }, duration);

    return () => clearTimeout(timeout);
  }, [content, duration, visible, isHovered]);

  return (
    <MotionToastContainer
      ref={hoverRef}
      variant={type}
      my={[2, 3]}
      px={3}
      py={3}
      fontSize={2}
      width={[6, 7]}
      positionTransition={true}
      initial={{ opacity: 0, x: 0, scale: 0.3 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { type: 'spring', velocity: 3, stiffness: 200, damping: 20 },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        x: 100,
        transition: { ease: 'easeInOut', duration: 0.5 },
      }}
    >
      {content}
      {showClose && (
        <ToastCloseContainer onClick={() => onClose && onClose(id)}>
          <FaTimes />
        </ToastCloseContainer>
      )}
    </MotionToastContainer>
  );
}

const DEFAULT_DURATION_MS = 5000;

interface ToastContext {
  raiseToast: (content: ToastContent, definition?: ToastOptions) => void;
}

const INITIAL_CONTEXT: ToastContext = {
  raiseToast: noop,
};

const ToastContext = createContext(INITIAL_CONTEXT);

interface ToastContextProviderProps {
  children: React.ReactNode;
}

export function ToastContextProvider({ children }: ToastContextProviderProps) {
  const [toastItems, setToastItems] = useState<readonly ToastProps[]>([]);

  const removeToast = useCallback(
    (id: string) => {
      setToastItems(current => filter(t => t.id !== id, current));
    },
    [setToastItems],
  );

  const defaultProps = (content: ToastContent, options: ToastOptions): ToastProps => {
    const id = options.id ?? generateId();

    return {
      content,

      ...{
        id,
        duration: options.duration !== undefined ? options.duration : DEFAULT_DURATION_MS,
        showClose: true,
      },
      ...options,
      onClose: () => {
        removeToast(id);
        if (options.onClose) {
          options.onClose(id);
        }
      },
    };
  };

  const raiseToast = useCallback(
    (content: ToastContent, options: ToastOptions = {}) => {
      setToastItems(current => {
        const currentIndex = current.findIndex(t => t.id === options.id);
        if (currentIndex < 0) return [...current, defaultProps(content, options)];

        const currentToast = current[currentIndex];
        const updated = { ...currentToast, ...defaultProps(content, options) };

        return update(currentIndex, updated, current);
      });
    },
    [setToastItems],
  );

  const toastContext: ToastContext = useMemo(() => ({ raiseToast }), [raiseToast]);

  return (
    <ToastContext.Provider value={toastContext}>
      {children}
      <ToastRack padding={[2, 3]}>
        <AnimatePresence initial={false}>
          {toastItems.map(item => (
            <Toast key={item.id} {...item} />
          ))}
        </AnimatePresence>
      </ToastRack>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
