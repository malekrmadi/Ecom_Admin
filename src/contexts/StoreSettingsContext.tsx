import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { StoreSettingsService, StoreSettings } from "@/lib/services";

const defaultSettings: StoreSettings = {
  store_name: "Huiles Moteurs Tunisie",
  logo_url: "/uploads/branding/logo.png",
  hero_title: "Huiles & Lubrifiants Premium pour votre Moteur",
  hero_subtitle:
    "Huiles moteur, additifs et graisses de grandes marques. Livraison dans toute la Tunisie.",
  banner_image_url: "/uploads/branding/banner.jpg",
  facebook_url: "",
  instagram_url: "",
  email: "contact@huilesmoteurs.tn",
  phone: "+216 70 123 456",
};

interface StoreSettingsContextType {
  settings: StoreSettings;
  isLoading: boolean;
  getImageUrl: (path: string) => string;
}

const StoreSettingsContext = createContext<StoreSettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
  getImageUrl: (p) => p,
});

export const useStoreSettings = () => useContext(StoreSettingsContext);

export const StoreSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isLoading } = useQuery<StoreSettings>({
    queryKey: ["store-settings"],
    queryFn: StoreSettingsService.get,
    staleTime: 1000 * 60 * 5,
  });

  const settings: StoreSettings = data ?? defaultSettings;

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <StoreSettingsContext.Provider value={{ settings, isLoading, getImageUrl }}>
      {children}
    </StoreSettingsContext.Provider>
  );
};
