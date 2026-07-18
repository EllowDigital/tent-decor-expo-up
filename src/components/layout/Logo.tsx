import logoAsset from "@/assets/logo.asset.json";

export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Tent Decor Expo UP"
      className={className}
      width={380}
      height={200}
    />
  );
}
