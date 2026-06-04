import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAssetLoader } from "../../../../hooks/use-asset-loader";
import bmvlightmode from "../../../../assets/bmvlightmode.png";

const LOTTIE_SRC =
  "https://lottie.host/8af73863-ce75-4c9d-82e0-a0166e4720d0/VO4Wfi4Y2n.lottie";

/** 2 assets à surveiller : l'image + l'animation lottie */
const ASSET_COUNT = 2;

interface LoginMediaProps {
  onReady: () => void;
}

/**
 * Panneau droit de la page login.
 * Notifie le parent via `onReady` quand l'image ET le lottie sont chargés.
 */
export function LoginMedia({ onReady }: LoginMediaProps) {
  const { onAssetLoaded } = useAssetLoader({
    count: ASSET_COUNT,
    onReady,
  });

  return (
    <div className="bg-muted relative hidden lg:block">
      <img
        src={bmvlightmode}
        alt="Mindfulness & Bien-être"
        aria-hidden="true"
        onLoad={onAssetLoaded}
        onError={onAssetLoaded}
        className="absolute -top-40 inset-0 h-full w-full object-contain"
      />
      <DotLottieReact
        src={LOTTIE_SRC}
        loop
        autoplay
        onLoad={onAssetLoaded}
        className="w-full mt-72 object-contain"
      />
    </div>
  );
}
