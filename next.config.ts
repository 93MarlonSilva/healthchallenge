import type { NextConfig } from "next";
const { i18n } = require("./next-i18next.config");

const nextConfig: NextConfig = {
  i18n, // <- Aqui está a chave para o suporte ao next-i18next
  // outras opções de configuração...
};

export default nextConfig;
