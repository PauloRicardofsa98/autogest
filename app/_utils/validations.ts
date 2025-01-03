export async function validateCpfCnpj(value: string) {
  const cpfCnpj = value.replace(/\D/g, "");
  console.log({ cpfCnpj, length: cpfCnpj.length });
  if (!cpfCnpj) return false;
  if (cpfCnpj.length > 11) {
    if (cpfCnpj.length === 14) return true;
  }
  if (cpfCnpj.length === 11) return true;
  return false;
}
