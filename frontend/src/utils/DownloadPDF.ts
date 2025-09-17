export const downloadOrdenTrabajoPDF = async (nroOrdenTrabajo: number) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token disponible");

  const response = await fetch(
    `http://localhost:3000/api/ordenTrabajo/pdf/${nroOrdenTrabajo}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("Error al descargar el PDF");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orden-${nroOrdenTrabajo}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
