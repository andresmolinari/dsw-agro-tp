import { useState, useEffect } from 'react';
import { Campo } from '../types/Campo';
import ClienteService from '../services/ClienteService';

const useCampos = (clienteId: string) => {
  const [campos, setCampos] = useState<Campo[]>([]);

  useEffect(() => {
    const fetchCampos = async () => {
      if (!clienteId) return;
      const response = await ClienteService.getAllCamposByClienteId(clienteId);

      console.log(response);
      // response.status usar esto para ver los errores

      /* 
      esto esta devolviendo un objeto  

        {  datadelcliente , campos:Campo[] }
      
      
      */
      //@ts-expect-error
      setCampos(response.data.campos);
    };

    fetchCampos();
  }, [clienteId]);

  return { campos };
};

export default useCampos;
