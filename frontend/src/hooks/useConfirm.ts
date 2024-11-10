import { useState } from 'react';

// Hook personalizado para manejar la confirmación
const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado del modal
  const [message, setMessage] = useState(''); // Mensaje que se mostrará en el modal
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null); // Acción a realizar cuando se confirma

  // Función para abrir el modal con un mensaje y la acción de confirmación
  const confirm = (message: string, onConfirm: () => void) => {
    setMessage(message); // Establece el mensaje
    setOnConfirmCallback(() => onConfirm); // Establece la función de confirmación
    setIsOpen(true); // Abre el modal
  };

  // Función para cerrar el modal sin hacer nada
  const cancel = () => {
    setIsOpen(false);
    setMessage('');
    setOnConfirmCallback(null);
  };

  // Función para confirmar la acción
  const confirmAction = () => {
    if (onConfirmCallback) {
      onConfirmCallback(); // Llama a la función de confirmación
    }
    cancel(); // Cierra el modal después de confirmar
  };

  return {
    isOpen,
    message,
    confirm,
    cancel,
    confirmAction,
  };
};

export default useConfirm;
